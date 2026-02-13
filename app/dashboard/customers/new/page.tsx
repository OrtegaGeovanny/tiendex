'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/contexts/AuthContext'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { createCustomer } from '@/lib/firebase/customers'
import { ArrowLeft, Check, X } from 'lucide-react'

function CustomerFormContent({
  initialData,
  isEdit,
}: {
  initialData?: { id: string; name: string; phone?: string | null }
  isEdit?: boolean
}) {
  const { user } = useAuth()
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [name, setName] = useState(initialData?.name || '')
  const [phone, setPhone] = useState(initialData?.phone || '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name.trim()) {
      setError('Name is required')
      return
    }

    if (!user) return

    setSubmitting(true)
    try {
      if (isEdit && initialData) {
        const { updateCustomer } = await import('@/lib/firebase/customers')
        await updateCustomer(user.uid, initialData.id, {
          name: name.trim(),
          phone: phone.trim() || null,
        })
      } else {
        await createCustomer(user.uid, {
          name: name.trim(),
          phone: phone.trim() || null,
        })
      }
      setSuccess(true)
    } catch (err) {
      setError('Failed to save customer')
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleCancel = () => {
    router.push('/dashboard')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {isEdit ? 'Edit Customer' : 'Add Customer'}
        </h1>
        <p className="mt-2 text-gray-600">
          {isEdit
            ? 'Update customer information'
            : 'Add a new customer to your store'}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
          <X className="h-5 w-5 text-red-600 mr-2" />
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {success ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-green-900 mb-2">
            {isEdit ? 'Customer Updated!' : 'Customer Added!'}
          </h3>
          <p className="text-green-700 mb-6">
            {name} has been {isEdit ? 'updated' : 'added'} to your store
          </p>
          <button
            onClick={handleCancel}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back to Dashboard
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6 space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Name *
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter customer name"
                className="block w-full px-3 py-4 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-lg"
                required
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="Enter phone number (optional)"
                className="block w-full px-3 py-4 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-lg"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitting || !name.trim()}
              className="flex-1 py-4 px-6 border border-transparent text-lg font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Saving...' : 'Save Customer'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 py-4 px-6 border border-gray-300 text-lg font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default function NewCustomerPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <button
                  onClick={() => window.history.back()}
                  className="text-gray-600 hover:text-gray-900 mr-4"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <h1 className="text-xl font-bold text-gray-900">TiendexApp</h1>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-2xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <CustomerFormContent />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
