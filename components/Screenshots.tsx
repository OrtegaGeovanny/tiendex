'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Users, ShoppingCart, Package } from 'lucide-react'

interface PhoneMockupProps {
  title: string
  description: string
  icon: React.ReactNode
  children: React.ReactNode
  delay: number
}

function PhoneMockup({
  title,
  description,
  icon,
  children,
  delay,
}: PhoneMockupProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-center"
    >
      <motion.div
        whileHover={{ y: -10 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-[3rem] blur-2xl opacity-30 transform scale-95" />
        <div className="relative bg-gray-900 dark:bg-gray-800 rounded-[2.5rem] p-3 shadow-2xl">
          <div
            className="bg-white dark:bg-gray-900 rounded-[2rem] overflow-hidden"
            style={{ width: 280, height: 560 }}
          >
            {children}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: delay + 0.3 }}
        className="mt-8 text-center max-w-xs"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="text-blue-600 dark:text-blue-400">{icon}</div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </motion.div>
    </motion.div>
  )
}

function CustomersMockup() {
  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-800">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-6">
        <h4 className="text-white text-lg font-semibold">Customers</h4>
        <p className="text-blue-100 text-sm">3 customers</p>
      </div>

      <div className="p-4 space-y-3 flex-1 overflow-hidden">
        {[1, 2, 3].map(i => (
          <div
            key={i}
            className="bg-white dark:bg-gray-700 rounded-lg p-3 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <Users size={18} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {i === 1
                    ? 'María García'
                    : i === 2
                      ? 'Juan López'
                      : 'Ana Martínez'}
                </p>
                {i === 1 && (
                  <p className="text-xs text-gray-500">+52 555-0123</p>
                )}
                {i === 2 && (
                  <p className="text-xs text-red-600 font-medium">
                    Balance: $45.00
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-20 left-4 right-4">
        <button className="w-full bg-indigo-600 text-white py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
          <span>Add Customer</span>
        </button>
      </div>
    </div>
  )
}

function TransactionMockup() {
  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-800">
      <div className="bg-gradient-to-r from-green-600 to-teal-600 px-4 py-6">
        <h4 className="text-white text-lg font-semibold">New Transaction</h4>
        <p className="text-green-100 text-sm">Quick credit entry</p>
      </div>

      <div className="p-4 space-y-4 flex-1">
        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
            Customer
          </label>
          <div className="bg-white dark:bg-gray-700 rounded-lg p-3 flex items-center justify-between">
            <span className="text-sm text-gray-900 dark:text-white">
              María García
            </span>
            <div className="w-5 h-5 bg-gray-300 rounded-full" />
          </div>
        </div>

        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
            Product
          </label>
          <div className="bg-white dark:bg-gray-700 rounded-lg p-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Leche 1L
              </p>
              <p className="text-xs text-gray-500">$22.00</p>
            </div>
            <div className="w-5 h-5 bg-gray-300 rounded-full" />
          </div>
        </div>

        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
            Quantity
          </label>
          <div className="bg-white dark:bg-gray-700 rounded-lg p-3 flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              2
            </span>
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600">
                -
              </div>
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                +
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg p-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            Total Amount
          </p>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            $44.00
          </p>
        </div>
      </div>

      <div className="absolute bottom-20 left-4 right-4">
        <button className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-xl text-sm font-semibold">
          Record Transaction
        </button>
      </div>
    </div>
  )
}

function ProductsMockup() {
  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-800">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-6">
        <h4 className="text-white text-lg font-semibold">Products</h4>
        <p className="text-purple-100 text-sm">Inventory management</p>
      </div>

      <div className="p-4 space-y-3 flex-1 overflow-hidden">
        {[
          { name: 'Leche 1L', price: 22.0 },
          { name: 'Pan Integral', price: 35.0 },
          { name: 'Huevos (12)', price: 68.0 },
        ].map((product, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-700 rounded-lg p-3 shadow-sm flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <Package
                  size={18}
                  className="text-purple-600 dark:text-purple-400"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {product.name}
                </p>
              </div>
            </div>
            <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
              ${product.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="absolute bottom-20 left-4 right-4">
        <button className="w-full bg-purple-600 text-white py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
          <span>Add Product</span>
        </button>
      </div>
    </div>
  )
}

export default function Screenshots() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['50px', '-50px'])

  return (
    <section
      ref={ref}
      className="py-20 px-4 bg-white dark:bg-gray-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Mira cómo funciona
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Una interfaz intuitiva diseñada para ser productivo desde el primer
            día
          </p>
        </motion.div>

        <motion.div
          style={{ y }}
          className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-8"
        >
          <PhoneMockup
            title="Gestión de Clientes"
            description="Mantén un registro completo de tus clientes y sus saldos pendientes"
            icon={<Users size={24} />}
            delay={0}
          >
            <CustomersMockup />
          </PhoneMockup>

          <PhoneMockup
            title="Entrada Rápida"
            description="Registra fiados en segundos con autocompletado inteligente"
            icon={<ShoppingCart size={24} />}
            delay={0.2}
          >
            <TransactionMockup />
          </PhoneMockup>

          <PhoneMockup
            title="Inventario"
            description="Controla tus productos y precios de forma sencilla"
            icon={<Package size={24} />}
            delay={0.4}
          >
            <ProductsMockup />
          </PhoneMockup>
        </motion.div>
      </div>
    </section>
  )
}
