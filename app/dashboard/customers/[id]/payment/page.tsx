'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, DollarSign, Check, X } from 'lucide-react'
import { getCustomer } from '@/lib/firebase/customers'
import { createTransaction } from '@/lib/firebase/transactions'
import { useAuth } from '@/lib/contexts/AuthContext'
import { Customer } from '@/lib/firebase/types'

function PaymentContent() {
  const { user } = useAuth()
  const router = useRouter()
  const params = useParams()
  const customerId = params.id as string
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [amount, setAmount] = useState('')
  const [notes, setNotes] = useState('')

  const fetchCustomer = useCallback(async () => {
    if (!user || !customerId) return
    setLoading(true)
    setError(null)
    try {
      const data = await getCustomer(user.uid, customerId)
      if (data) {
        setCustomer(data)
        setAmount(data.totalDebt.toFixed(2))
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!customer || !user) return

    const paymentAmount = parseFloat(amount)
    if (isNaN(paymentAmount) || paymentAmount <= 0) {
      setError('Please enter a valid payment amount')
      return
    }

    if (paymentAmount > customer.totalDebt) {
      setError('Payment amount cannot exceed outstanding balance')
      return
    }

    setSubmitting(true)
    try {
      await createTransaction(user.uid, {
        customerId: customer.id,
        customerName: customer.name,
        productId: null,
        productName: null,
        quantity: null,
        price: null,
        totalAmount: paymentAmount,
        type: 'payment',
        notes: notes.trim() || null,
      })

      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to record payment')
    } finally {
      setSubmitting(false)
    }
  }

  const goBack = () => {
    window.history.back()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (!customer) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">Customer not found</p>
      </div>
    )
  }

  if (success) {
    const newBalance = Math.max(0, customer.totalDebt - parseFloat(amount))
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-green-900 mb-2">
          Payment Recorded!
        </h3>
        <p className="text-green-700 mb-2">
          Payment of ${parseFloat(amount).toFixed(2)} received from{' '}
          {customer.name}
        </p>
        <p className="text-green-800 font-semibold mb-6">
          New Balance: ${newBalance.toFixed(2)}
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => {
              setSuccess(false)
              fetchCustomer()
            }}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Record Another Payment
          </button>
          <button
            onClick={() => router.push(`/dashboard/customers/${customer.id}`)}
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            View Customer Details
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Record Payment</h1>
        <p className="mt-2 text-gray-600">
          Record a payment from {customer.name}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
          <X className="h-5 w-5 text-red-600 mr-2" />
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customer
            </label>
            <p className="text-lg text-gray-900">{customer.name}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Outstanding Balance
            </label>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-gray-400" />
              <p
                className={`text-lg font-bold ${
                  customer.totalDebt > 0 ? 'text-red-600' : 'text-green-600'
                }`}
              >
                ${customer.totalDebt.toFixed(2)}
              </p>
            </div>
          </div>

          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Payment Amount
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="amount"
                type="number"
                step="0.01"
                min="0.01"
                max={customer.totalDebt}
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="0.00"
                inputMode="decimal"
                className="pl-10 block w-full px-3 py-4 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-lg"
                required
              />
            </div>
            {customer.totalDebt > 0 && (
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setAmount(customer.totalDebt.toFixed(2))}
                  className="text-sm text-indigo-600 hover:text-indigo-700"
                >
                  Pay Full Amount (${customer.totalDebt.toFixed(2)})
                </button>
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Notes (optional)
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Add any notes about this payment..."
              rows={3}
              className="block w-full px-3 py-4 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-lg"
            />
          </div>

          {amount && parseFloat(amount) > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">New Balance</span>
                <span className="text-2xl font-bold text-gray-900">
                  $
                  {Math.max(0, customer.totalDebt - parseFloat(amount)).toFixed(
                    2
                  )}
                </span>
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting || !amount || parseFloat(amount) <= 0}
          className="w-full py-4 px-6 border border-transparent text-lg font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Recording...' : 'Record Payment'}
        </button>
      </form>
    </div>
  )
}

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <PaymentContent />
        </div>
      </main>
    </div>
  )
}
