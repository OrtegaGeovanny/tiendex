'use client'

import { useAuth } from '@/lib/contexts/AuthContext'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import {
  Settings as SettingsIcon,
  User as UserIcon,
  Shield,
  Bell,
} from 'lucide-react'
import { motion } from 'framer-motion'

function SettingsContent() {
  const { user } = useAuth()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">
          Manage your account and preferences
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-white rounded-lg shadow"
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Account</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-start space-x-4">
            <UserIcon className="w-5 h-5 text-gray-400 mt-0.5" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <p className="mt-1 text-gray-900">{user?.email}</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="bg-white rounded-lg shadow"
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Preferences</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-start space-x-4">
            <Bell className="w-5 h-5 text-gray-400 mt-0.5" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Notifications
              </label>
              <p className="mt-1 text-gray-600">
                Receive notifications for overdue payments and important updates
              </p>
              <button className="mt-2 text-indigo-600 hover:text-indigo-700 text-sm font-medium px-3 py-2 min-h-[44px] inline-flex items-center">
                Configure notifications
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="bg-white rounded-lg shadow"
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Security</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-start space-x-4">
            <Shield className="w-5 h-5 text-gray-400 mt-0.5" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <p className="mt-1 text-gray-600">Last changed recently</p>
              <button className="mt-2 text-indigo-600 hover:text-indigo-700 text-sm font-medium px-3 py-2 min-h-[44px] inline-flex items-center">
                Change password
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <SettingsContent />
    </ProtectedRoute>
  )
}
