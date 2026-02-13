'use client'

import { motion } from 'framer-motion'
import { Package, Users, DollarSign, History } from 'lucide-react'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
    >
      <div className="mb-4 text-blue-600 dark:text-blue-400">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  )
}

export default function Features() {
  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Todo lo que necesitas para gestionar tu negocio
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            TiendexApp te ofrece herramientas simples y poderosas para llevar el
            control de tu tienda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={<Package size={40} />}
            title="Gestión de Productos"
            description="Organiza y controla tu inventario de manera sencilla y eficiente"
          />
          <FeatureCard
            icon={<Users size={40} />}
            title="Seguimiento de Clientes"
            description="Mantén un registro detallado de todos tus clientes y sus compras"
          />
          <FeatureCard
            icon={<DollarSign size={40} />}
            title="Crédito Fiado"
            description="Administra las cuentas por cobrar y los fiados de forma segura"
          />
          <FeatureCard
            icon={<History size={40} />}
            title="Historial de Pagos"
            description="Visualiza el historial completo de transacciones y pagos"
          />
        </div>
      </div>
    </section>
  )
}
