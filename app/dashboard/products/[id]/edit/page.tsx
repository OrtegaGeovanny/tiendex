'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAuth } from '@/lib/contexts/AuthContext'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { getProduct } from '@/lib/firebase/products'
import { ArrowLeft, Check, X, Trash2 } from 'lucide-react'

function EditProductFormContent() {
  const { user } = useAuth()
  const router = useRouter()
  const params = useParams()
  const productId = params.id as string
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [stockQuantity, setStockQuantity] = useState('')
  const [unit, setUnit] = useState('')

  useEffect(() => {
    const uid = user?.uid
    if (!uid) return

    async function loadProduct() {
      try {
        const product = await getProduct(uid as string, productId)
        if (product) {
          setName(product.name)
          setPrice(product.price.toString())
          setStockQuantity(product.stockQuantity.toString())
          setUnit(product.unit || '')
        } else {
          setError('Product not found')
        }
      } catch (err) {
        setError('Failed to load product')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [user, productId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name.trim()) {
      setError('Product name is required')
      return
    }

    const priceNum = parseFloat(price)
    if (isNaN(priceNum) || priceNum < 0) {
      setError('Please enter a valid price')
      return
    }

    const stockNum = parseInt(stockQuantity)
    if (isNaN(stockNum) || stockNum < 0) {
      setError('Please enter a valid stock quantity')
      return
    }

    if (!user) return

    setSubmitting(true)
    try {
      const { updateProduct } = await import('@/lib/firebase/products')
      await updateProduct(user.uid, productId, {
        name: name.trim(),
        price: priceNum,
        stockQuantity: stockNum,
        unit: unit.trim() || null,
      })
      setSuccess(true)
    } catch (err) {
      setError('Failed to save product')
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleCancel = () => {
    router.push('/dashboard/products')
  }

  const handleDelete = async () => {
    if (!user) return

    setDeleting(true)
    try {
      const { deleteProduct } = await import('@/lib/firebase/products')
      await deleteProduct(user.uid, productId)
      router.push('/dashboard/products')
    } catch (err) {
      setError('Failed to delete product')
      console.error(err)
      setShowDeleteConfirm(false)
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
        <p className="mt-2 text-gray-600">Update product information</p>
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
            Product Updated!
          </h3>
          <p className="text-green-700 mb-6">{name} has been updated</p>
          <button
            onClick={handleCancel}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back to Products
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
                Product Name *
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter product name"
                className="block w-full px-3 py-4 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-lg"
                required
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Price ($)
              </label>
              <input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={e => setPrice(e.target.value)}
                placeholder="0.00"
                inputMode="decimal"
                className="block w-full px-3 py-4 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-lg"
                required
              />
            </div>

            <div>
              <label
                htmlFor="stockQuantity"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Stock Quantity
              </label>
              <input
                id="stockQuantity"
                type="number"
                min="0"
                value={stockQuantity}
                onChange={e => setStockQuantity(e.target.value)}
                placeholder="0"
                inputMode="numeric"
                className="block w-full px-3 py-4 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-lg"
                required
              />
            </div>

            <div>
              <label
                htmlFor="unit"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Unit (optional)
              </label>
              <input
                id="unit"
                type="text"
                value={unit}
                onChange={e => setUnit(e.target.value)}
                placeholder="e.g., kg, liter, piece"
                className="block w-full px-3 py-4 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-lg"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            disabled={submitting}
            className="w-full py-3 px-6 border border-red-300 text-base font-medium rounded-lg text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Trash2 className="h-5 w-5" />
            Delete Product
          </button>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitting || !name.trim()}
              className="flex-1 py-4 px-6 border border-transparent text-lg font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Saving...' : 'Save Product'}
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

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Delete Product?
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete &quot;{name}&quot;? This action
              cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deleting}
                className="flex-1 py-3 px-4 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-3 px-4 border border-transparent text-base font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {deleting ? (
                  'Deleting...'
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function EditProductPage() {
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
            <EditProductFormContent />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
