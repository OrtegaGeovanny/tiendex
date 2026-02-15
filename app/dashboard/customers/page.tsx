'use client'

import { useState, useEffect, useMemo } from 'react'
import { useAuth } from '@/lib/contexts/AuthContext'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { getCustomers } from '@/lib/firebase/customers'
import { Customer } from '@/lib/firebase/types'
import { Plus, Search, User, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type SortOption = 'highest-debt' | 'alphabetical' | 'recent-activity'

function CustomersListContent() {
  const { user } = useAuth()
  const router = useRouter()
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('highest-debt')

  useEffect(() => {
    async function fetchCustomers() {
      if (!user) return
      try {
        const data = await getCustomers(user.uid)
        setCustomers(data)
      } catch (error) {
        console.error('Error fetching customers:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCustomers()
  }, [user])

  const sortedAndFilteredCustomers = useMemo(() => {
    let result = [...customers]

    if (searchQuery.trim() !== '') {
      result = result.filter(customer =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case 'highest-debt':
          return b.totalDebt - a.totalDebt
        case 'alphabetical':
          return a.name.localeCompare(b.name)
        case 'recent-activity':
          return b.updatedAt.toMillis() - a.updatedAt.toMillis()
        default:
          return 0
      }
    })

    return result
  }, [customers, searchQuery, sortBy])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-600 mt-1">
            {customers.length}{' '}
            {customers.length === 1 ? 'cliente' : 'clientes'}
          </p>
        </div>
        <Link
          href="/dashboard/customers/new"
          className="flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Agregar Cliente</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar clientes..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg"
          />
        </div>

        <div className="relative">
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as SortOption)}
            className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg appearance-none bg-white"
          >
            <option value="highest-debt">Mayor Deuda</option>
            <option value="alphabetical">A-Z</option>
            <option value="recent-activity">Actividad Reciente</option>
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : sortedAndFilteredCustomers.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchQuery ? 'No se encontraron clientes' : 'Aún no hay clientes'}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchQuery
              ? 'Intenta con otro término de búsqueda'
              : 'Comienza agregando tu primer cliente'}
          </p>
          {!searchQuery && (
            <Link
              href="/dashboard/customers/new"
              className="inline-flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Agregar Cliente</span>
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {sortedAndFilteredCustomers.map(customer => (
            <button
              key={customer.id}
              onClick={() => router.push(`/dashboard/customers/${customer.id}`)}
              className="w-full bg-white rounded-lg shadow p-4 sm:p-6 text-left hover:shadow-lg transition-all flex items-center justify-between"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {customer.name}
                  </h3>
                  {customer.totalDebt > 0 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Due
                    </span>
                  )}
                </div>
                {customer.phone && (
                  <p className="text-gray-600 mt-1">{customer.phone}</p>
                )}
                <p
                  className={`mt-2 text-2xl font-bold ${
                    customer.totalDebt > 0 ? 'text-red-600' : 'text-green-600'
                  }`}
                >
                  ${customer.totalDebt.toFixed(2)}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
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
