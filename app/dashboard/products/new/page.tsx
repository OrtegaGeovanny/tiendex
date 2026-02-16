'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/contexts/AuthContext'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { createProduct } from '@/lib/firebase/products'
import { ArrowLeft, Check, X } from 'lucide-react'

function ProductFormContent({
  initialData,
  isEdit,
}: {
  initialData?: {
    id: string
    name: string
    price: number
    stockQuantity: number
    unit?: string | null
  }
  isEdit?: boolean
}) {
  const { user } = useAuth()
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [name, setName] = useState(initialData?.name || '')
  const [price, setPrice] = useState(initialData?.price.toString() || '')
  const [stockQuantity, setStockQuantity] = useState(
    initialData?.stockQuantity.toString() || '0'
  )
  const [unit, setUnit] = useState(initialData?.unit || '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name.trim()) {
      setError('El nombre del producto es requerido')
      return
    }

    const priceNum = parseFloat(price)
    if (isNaN(priceNum) || priceNum < 0) {
      setError('Por favor ingresa un precio válido')
      return
    }

    const stockNum = parseInt(stockQuantity)
    if (isNaN(stockNum) || stockNum < 0) {
      setError('Por favor ingresa una cantidad de stock válida')
      return
    }

    if (!user) return

    setSubmitting(true)
    try {
      if (isEdit && initialData) {
        const { updateProduct } = await import('@/lib/firebase/products')
        await updateProduct(user.uid, initialData.id, {
          name: name.trim(),
          price: priceNum,
          stockQuantity: stockNum,
          unit: unit.trim() || null,
        })
      } else {
        await createProduct(user.uid, {
          name: name.trim(),
          price: priceNum,
          stockQuantity: stockNum,
          unit: unit.trim() || null,
        })
      }
      setSuccess(true)
    } catch (err) {
      setError('Error al guardar producto')
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleCancel = () => {
    router.push('/dashboard/products')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {isEdit ? 'Editar Producto' : 'Agregar Producto'}
        </h1>
        <p className="mt-2 text-gray-600">
          {isEdit
            ? 'Actualizar información del producto'
            : 'Agregar un nuevo producto a tu inventario'}
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
            {isEdit ? '¡Producto Actualizado!' : '¡Producto Agregado!'}
          </h3>
          <p className="text-green-700 mb-6">
            {name} ha sido {isEdit ? 'actualizado' : 'agregado'} a tu inventario
          </p>
          <button
            onClick={handleCancel}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Volver a Productos
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
                Nombre del Producto *
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Ingresa nombre del producto"
                className="block w-full px-3 py-4 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-lg"
                required
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Precio ($)
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
                Cantidad en Stock
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
                Unidad (opcional)
              </label>
              <input
                id="unit"
                type="text"
                value={unit}
                onChange={e => setUnit(e.target.value)}
                placeholder="ej., kg, litro, pieza"
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
              {submitting ? 'Guardando...' : 'Guardar Producto'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 py-4 px-6 border border-gray-300 text-lg font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default function NewProductPage() {
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
                <h1 className="text-xl font-bold text-gray-900">Tiendex</h1>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-2xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <ProductFormContent />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
