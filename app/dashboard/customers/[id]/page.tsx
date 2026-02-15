'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Phone,
  DollarSign,
  CreditCard,
  Plus,
  Package,
  Calendar,
} from 'lucide-react'
import { getCustomer } from '@/lib/firebase/customers'
import { getTransactionsByCustomer } from '@/lib/firebase/transactions'
import { useAuth } from '@/lib/contexts/AuthContext'
import { Customer, Transaction } from '@/lib/firebase/types'
import { motion } from 'framer-motion'

export default function CustomerDetailPage() {
  const { user } = useAuth()
  const router = useRouter()
  const params = useParams()
  const customerId = params.id as string
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCustomer = useCallback(async () => {
    if (!user || !customerId) return
    setLoading(true)
    setError(null)
    try {
      const [data, transactionsData] = await Promise.all([
        getCustomer(user.uid, customerId),
        getTransactionsByCustomer(user.uid, customerId),
      ])
      if (data) {
        setCustomer(data)
        setTransactions(transactionsData)
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

  const transactionsWithBalance = useMemo(() => {
    const sortedTransactions = [...transactions].sort(
      (a, b) => b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime()
    )
    const result = []
    let runningBalance = customer?.totalDebt || 0

    for (const tx of sortedTransactions) {
      result.push({
        ...tx,
        runningBalance,
      })
      if (tx.type === 'credit') {
        runningBalance -= tx.totalAmount
      } else {
        runningBalance += tx.totalAmount
      }
    }

    return result
  }, [transactions, customer])

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
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
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
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white shadow rounded-lg overflow-hidden"
          >
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                  Customer Details
                </h1>
                <div className="flex gap-3">
                  <button
                    onClick={() =>
                      router.push(
                        `/dashboard/transactions/new?customerId=${customerId}&customerName=${encodeURIComponent(customer?.name || '')}`
                      )
                    }
                    className="inline-flex items-center px-4 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 min-h-[44px]"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Give Credit
                  </button>
                  {customer && customer.totalDebt > 0 && (
                    <button
                      onClick={() =>
                        router.push(
                          `/dashboard/customers/${customer.id}/payment`
                        )
                      }
                      className="inline-flex items-center px-4 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 min-h-[44px]"
                    >
                      <CreditCard className="w-5 h-5 mr-2" />
                      Record Payment
                    </button>
                  )}
                </div>
              </div>

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

              <div className="mt-6 border-t pt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Transaction History
                </h2>
                {transactionsWithBalance.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
                      <Package className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No transactions yet
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Give credit or record payments for this customer to see
                      their history here
                    </p>
                    <button
                      onClick={() =>
                        router.push(
                          `/dashboard/transactions/new?customerId=${customerId}&customerName=${encodeURIComponent(customer?.name || '')}`
                        )
                      }
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Give Credit
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {transactionsWithBalance.map((tx, index) => (
                      <motion.div
                        key={tx.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        className="bg-gray-50 rounded-lg p-4"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div
                              className={`flex items-center justify-center h-10 w-10 rounded-full ${
                                tx.type === 'credit'
                                  ? 'bg-blue-100'
                                  : 'bg-green-100'
                              }`}
                            >
                              {tx.type === 'credit' ? (
                                <Package className="h-5 w-5 text-blue-600" />
                              ) : (
                                <DollarSign className="h-5 w-5 text-green-600" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {tx.type === 'credit' ? 'Credit' : 'Payment'}
                              </p>
                              {tx.type === 'credit' && tx.productName && (
                                <p className="text-sm text-gray-600">
                                  {tx.productName}
                                  {tx.quantity && tx.quantity > 1 && (
                                    <span className="ml-1">
                                      (x{tx.quantity})
                                    </span>
                                  )}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <p
                              className={`text-lg font-bold ${
                                tx.type === 'credit'
                                  ? 'text-red-600'
                                  : 'text-green-600'
                              }`}
                            >
                              {tx.type === 'credit' ? '+' : '-'}$
                              {tx.totalAmount.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(
                                tx.createdAt.seconds * 1000
                              ).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                          <div>
                            Balance after:{' '}
                            <span
                              className={`font-semibold ${
                                tx.runningBalance > 0
                                  ? 'text-red-600'
                                  : 'text-green-600'
                              }`}
                            >
                              ${tx.runningBalance.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
