'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/contexts/AuthContext'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { getCustomers } from '@/lib/firebase/customers'
import { Plus, Search, User, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function CustomersListContent() {
  const { user } = useAuth()
  const router = useRouter()
  const [customers, setCustomers] = useState<any[]>([])
  const [filteredCustomers, setFilteredCustomers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    async function fetchCustomers() {
      if (!user) return
      try {
        const data = await getCustomers(user.uid)
        setCustomers(data)
        setFilteredCustomers(data)
      } catch (error) {
        console.error('Error fetching customers:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCustomers()
  }, [user])

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCustomers(customers)
    } else {
      const filtered = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredCustomers(filtered)
    }
  }, [searchQuery, customers])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600 mt-1">
            {customers.length}{' '}
            {customers.length === 1 ? 'customer' : 'customers'}
          </p>
        </div>
        <Link
          href="/dashboard/customers/new"
          className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Customer</span>
        </Link>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search customers..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : filteredCustomers.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchQuery ? 'No customers found' : 'No customers yet'}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchQuery
              ? 'Try a different search term'
              : 'Get started by adding your first customer'}
          </p>
          {!searchQuery && (
            <Link
              href="/dashboard/customers/new"
              className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add Customer</span>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCustomers.map(customer => (
            <button
              key={customer.id}
              onClick={() => router.push(`/dashboard/customers/${customer.id}`)}
              className="bg-white rounded-lg shadow p-6 text-left hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {customer.name}
                  </h3>
                  {customer.phone && (
                    <p className="text-gray-600 mt-1">{customer.phone}</p>
                  )}
                  {customer.totalDebt > 0 && (
                    <p className="text-red-600 font-medium mt-2">
                      Balance: ${customer.totalDebt.toFixed(2)}
                    </p>
                  )}
                </div>
                <Plus className="w-5 h-5 text-gray-400 flex-shrink-0" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function CustomersListPage() {
  return (
    <ProtectedRoute>
      <CustomersListContent />
    </ProtectedRoute>
  )
}
