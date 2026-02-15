'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/lib/contexts/AuthContext'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { getProducts } from '@/lib/firebase/products'
import { getCustomers } from '@/lib/firebase/customers'
import { createTransaction } from '@/lib/firebase/transactions'
import { Product, Customer } from '@/lib/firebase/types'
import { Search, Plus, Check, X } from 'lucide-react'

function QuickCreditContent() {
  const { user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const customerId = searchParams.get('customerId')
  const customerName = searchParams.get('customerName')

  const [products, setProducts] = useState<Product[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  )
  const [quantity, setQuantity] = useState(1)
  const [productSearch, setProductSearch] = useState('')
  const [customerSearch, setCustomerSearch] = useState(customerName || '')

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase())
  )
  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(customerSearch.toLowerCase())
  )

  const totalAmount = selectedProduct ? selectedProduct.price * quantity : 0

  useEffect(() => {
    const uid = user?.uid
    if (!uid) return

    async function loadData() {
      try {
        const [productsData, customersData] = await Promise.all([
          getProducts(uid as string),
          getCustomers(uid as string),
        ])
        setProducts(productsData)
        setCustomers(customersData)

        if (customerId) {
          const preselectedCustomer = customersData.find(
            c => c.id === customerId
          )
          if (preselectedCustomer) {
            setSelectedCustomer(preselectedCustomer)
            setCustomerSearch(preselectedCustomer.name)
          }
        }
      } catch (err) {
        setError('Failed to load data')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [user, customerId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!selectedProduct || !selectedCustomer) {
      setError('Please select both a product and a customer')
      return
    }

    if (!user) return

    setSubmitting(true)
    try {
      await createTransaction(user.uid, {
        customerId: selectedCustomer.id,
        customerName: selectedCustomer.name,
        productId: selectedProduct.id,
        productName: selectedProduct.name,
        quantity,
        price: selectedProduct.price,
        totalAmount,
        type: 'credit',
      })

      setSuccess(true)
      resetForm()
    } catch (err) {
      setError('Failed to record transaction')
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setSelectedProduct(null)
    setSelectedCustomer(null)
    setQuantity(1)
    setProductSearch('')
    setCustomerSearch('')
  }

  const handleAddAnother = () => {
    setSuccess(false)
    resetForm()
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
        <h1 className="text-3xl font-bold text-gray-900">Quick Credit Entry</h1>
        <p className="mt-2 text-gray-600">
          Record a customer&apos;s credit purchase in seconds
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
            Transaction Recorded!
          </h3>
          <p className="text-green-700 mb-6">
            {selectedCustomer?.name} owes ${totalAmount.toFixed(2)} for{' '}
            {quantity} {quantity === 1 ? 'unit' : 'units'} of{' '}
            {selectedProduct?.name}
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={handleAddAnother}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="h-5 w-5 mr-2" />
              Record Another
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6 space-y-6">
            <div>
              <label
                htmlFor="product"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Product
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="product"
                  type="text"
                  value={productSearch}
                  onChange={e => setProductSearch(e.target.value)}
                  placeholder="Search products..."
                  className="pl-10 block w-full px-3 py-4 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-lg"
                />
              </div>
              {filteredProducts.length > 0 && (
                <div className="mt-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg">
                  {filteredProducts.map(product => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => {
                        setSelectedProduct(product)
                        setProductSearch(product.name)
                      }}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-50 flex justify-between items-center ${
                        selectedProduct?.id === product.id ? 'bg-indigo-50' : ''
                      }`}
                    >
                      <span className="font-medium">{product.name}</span>
                      <span className="text-gray-600">
                        ${product.price.toFixed(2)}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="customer"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Customer
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="customer"
                  type="text"
                  value={customerSearch}
                  onChange={e => setCustomerSearch(e.target.value)}
                  placeholder="Search customers..."
                  className="pl-10 block w-full px-3 py-4 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-lg"
                />
              </div>
              {filteredCustomers.length > 0 && (
                <div className="mt-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg">
                  {filteredCustomers.map(customer => (
                    <button
                      key={customer.id}
                      type="button"
                      onClick={() => {
                        setSelectedCustomer(customer)
                        setCustomerSearch(customer.name)
                      }}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-50 ${
                        selectedCustomer?.id === customer.id
                          ? 'bg-indigo-50'
                          : ''
                      }`}
                    >
                      <div>
                        <span className="font-medium">{customer.name}</span>
                        {customer.phone && (
                          <span className="ml-2 text-sm text-gray-500">
                            {customer.phone}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Quantity
              </label>
              <input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={e => setQuantity(parseInt(e.target.value) || 1)}
                className="block w-full px-3 py-4 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-lg"
              />
            </div>

            {selectedProduct && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="text-2xl font-bold text-gray-900">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting || !selectedProduct || !selectedCustomer}
            className="w-full py-4 px-6 border border-transparent text-lg font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Recording...' : 'Record Credit'}
          </button>
        </form>
      )}
    </div>
  )
}

export default function QuickCreditPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <button
                  onClick={() => window.history.back()}
                  className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors mr-4"
                >
                  ← Back
                </button>
                <h1 className="text-xl font-bold text-gray-900">TiendexApp</h1>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-2xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <QuickCreditContent />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
