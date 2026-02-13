'use client'

import { useEffect, useCallback } from 'react'
import { useAuth } from '@/lib/contexts/AuthContext'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { useNotification } from '@/lib/contexts/NotificationContext'
import {
  getNotifications,
  createNotification,
} from '@/lib/firebase/notifications'
import { getCustomersWithDebt } from '@/lib/firebase/customers'
import { Bell } from 'lucide-react'
import Link from 'next/link'

function DashboardContent() {
  const { user } = useAuth()
  const { fetchUnreadCount, openNotificationPanel, unreadCount } =
    useNotification()

  const checkForOverduePayments = useCallback(async () => {
    if (!user) return
    try {
      const customersWithDebt = await getCustomersWithDebt(user.uid, 0)
      const existingNotifications = await getNotifications(user.uid)

      for (const customer of customersWithDebt) {
        const notificationExists = existingNotifications.some(
          n => n.customerId === customer.id && !n.dismissed
        )

        if (!notificationExists) {
          await createNotification(user.uid, {
            customerId: customer.id,
            customerName: customer.name,
            debtAmount: customer.totalDebt,
            message: `has an outstanding balance of $${customer.totalDebt.toFixed(2)}`,
          })
        }
      }

      fetchUnreadCount()
    } catch (error) {
      console.error('Error checking for overdue payments:', error)
    }
  }, [user, fetchUnreadCount])

  useEffect(() => {
    if (user) {
      checkForOverduePayments()
    }
  }, [user, checkForOverduePayments])

  return (
    <>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back!</h1>
        <p className="text-gray-600">
          You are successfully logged in as {user?.email}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link
              href="/dashboard/customers/new"
              className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
            >
              Add Customer
            </Link>
            <Link
              href="/dashboard/transactions/new"
              className="block w-full text-center bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
            >
              Record Transaction
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Notifications
          </h2>
          <div className="flex items-center justify-center">
            <button
              onClick={openNotificationPanel}
              className="relative inline-flex items-center justify-center p-4 bg-indigo-50 rounded-full hover:bg-indigo-100 transition-colors"
            >
              <Bell className="w-8 h-8 text-indigo-600" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">
            {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
    </>
  )
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}
