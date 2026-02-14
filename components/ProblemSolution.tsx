'use client'

import { motion } from 'framer-motion'
import {
  Book,
  Zap,
  TrendingUp,
  Shield,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react'

function ProblemItem({
  icon,
  title,
  description,
  delay,
}: {
  icon: React.ReactNode
  title: string
  description: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex gap-4 p-4 bg-red-50 dark:bg-red-900/10 rounded-xl"
    >
      <div className="flex-shrink-0 w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
        <div className="text-red-600 dark:text-red-400">{icon}</div>
      </div>
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
          {title}
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

function SolutionItem({
  icon,
  title,
  description,
  delay,
}: {
  icon: React.ReactNode
  title: string
  description: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex gap-4 p-4 bg-green-50 dark:bg-green-900/10 rounded-xl"
    >
      <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
        <div className="text-green-600 dark:text-green-400">{icon}</div>
      </div>
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
          {title}
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

export default function ProblemSolution() {
  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            ¿Por qué necesitas TiendexApp?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Descubre cómo dejar atrás las hojas de papel y mejorar tu negocio
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <AlertCircle
                  size={24}
                  className="text-red-600 dark:text-red-400"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                El problema
              </h3>
            </div>

            <div className="space-y-4">
              <ProblemItem
                icon={<Book size={20} />}
                title="Cuadernos desordenados"
                description="Páginas arrugadas, tinta borrosa y notas perdidas hacen imposible encontrar información rápidamente"
                delay={0.1}
              />
              <ProblemItem
                icon={<AlertCircle size={20} />}
                title="Errores de cálculo"
                description="Calcular saldos manualmente lleva a confusiones y discusiones con clientes sobre fiados"
                delay={0.2}
              />
              <ProblemItem
                icon={<TrendingUp size={20} />}
                title="Sin control de inventario"
                description="No sabes qué productos se venden más o cuándo necesitas reabastecer hasta que es tarde"
                delay={0.3}
              />
              <ProblemItem
                icon={<Shield size={20} />}
                title="Pérdida de dinero"
                description="Fiados olvidados y pagos no registrados se pierden en el caos del papel"
                delay={0.4}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <CheckCircle2
                  size={24}
                  className="text-green-600 dark:text-green-400"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                La solución
              </h3>
            </div>

            <div className="space-y-4">
              <SolutionItem
                icon={<Zap size={20} />}
                title="Todo en un lugar"
                description="Acceso instantáneo desde tu celular a clientes, productos y fiados con búsqueda inteligente"
                delay={0.1}
              />
              <SolutionItem
                icon={<CheckCircle2 size={20} />}
                title="Cálculos automáticos"
                description="Saldos actualizados en tiempo real sin errores humanos ni confusiones"
                delay={0.2}
              />
              <SolutionItem
                icon={<TrendingUp size={20} />}
                title="Control total de inventario"
                description="Sabe exactamente qué vendes, cuánto stock tienes y cuándo reabastecer"
                delay={0.3}
              />
              <SolutionItem
                icon={<Shield size={20} />}
                title="Dinero recuperado"
                description="Fiados organizados, pagos registrados y recordatorios automáticos de deudas pendientes"
                delay={0.4}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
