'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { ArrowLeft, Phone, DollarSign } from 'lucide-react'
import { getCustomer } from '@/lib/firebase/customers'
import { useAuth } from '@/lib/contexts/AuthContext'
import { Customer } from '@/lib/firebase/types'

export default function CustomerDetailPage() {
  const { user } = useAuth()
  const params = useParams()
  const customerId = params.id as string
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCustomer = useCallback(async () => {
    if (!user || !customerId) return
    setLoading(true)
    setError(null)
    try {
      const data = await getCustomer(user.uid, customerId)
      if (data) {
        setCustomer(data)
      } else {
        setError('Customer not found')
      }
    } catch (err) {
      setError('Failed to load customer details')
    } finally {
      setLoading(false)
    }
  }, [user, customerId])

  useEffect(() => {
    fetchCustomer()
  }, [fetchCustomer])

  const goBack = () => {
    window.history.back()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <button
                onClick={goBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Customer Details
              </h1>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <p className="text-lg text-gray-900">{customer?.name}</p>
                </div>

                {customer?.phone && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <div className="flex items-center gap-2">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <p className="text-lg text-gray-900">{customer.phone}</p>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Outstanding Balance
                  </label>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                    <p
                      className={`text-lg font-bold ${
                        customer?.totalDebt && customer.totalDebt > 0
                          ? 'text-red-600'
                          : 'text-green-600'
                      }`}
                    >
                      ${customer?.totalDebt?.toFixed(2) || '0.00'}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-500">
                    Created:{' '}
                    {customer?.createdAt
                      ? new Date(
                          customer.createdAt.seconds * 1000
                        ).toLocaleDateString()
                      : 'N/A'}
                  </p>
                  <p className="text-sm text-gray-500">
                    Last updated:{' '}
                    {customer?.updatedAt
                      ? new Date(
                          customer.updatedAt.seconds * 1000
                        ).toLocaleDateString()
                      : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
