'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Bell, X, Check, User } from 'lucide-react'
import {
  getUnreadNotifications,
  markNotificationAsRead,
  dismissNotification,
} from '@/lib/firebase/notifications'
import { useAuth } from '@/lib/contexts/AuthContext'
import { useNotification } from '@/lib/contexts/NotificationContext'
import { Notification } from '@/lib/firebase/types'

interface NotificationPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  const { user } = useAuth()
  const router = useRouter()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(false)

  const fetchNotifications = useCallback(async () => {
    if (!user) return
    setLoading(true)
    try {
      const unread = await getUnreadNotifications(user.uid)
      setNotifications(unread)
    } catch (error) {
      console.error('Error fetching notifications:', error)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (isOpen && user) {
      fetchNotifications()
    }
  }, [isOpen, user, fetchNotifications])

  const handleNotificationClick = async (notification: Notification) => {
    await markNotificationAsRead(user!.uid, notification.id)
    router.push(`/dashboard/customers/${notification.customerId}`)
    onClose()
  }

  const handleDismiss = async (e: React.MouseEvent, notificationId: string) => {
    e.stopPropagation()
    try {
      await dismissNotification(user!.uid, notificationId)
      setNotifications(notifications.filter(n => n.id !== notificationId))
    } catch (error) {
      console.error('Error dismissing notification:', error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end pt-16 sm:pt-20 px-4 sm:px-6">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
          <button
            onClick={onClose}
            className="p-3 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[60vh]">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <Bell className="w-12 h-12 text-gray-300 mb-3" />
              <p className="text-gray-500">No notifications</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map(notification => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.customerName}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Outstanding balance: $
                        {notification.debtAmount.toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={e => handleDismiss(e, notification.id)}
                      className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-full transition-colors"
                      aria-label="Dismiss notification"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface NotificationBadgeProps {
  unreadCount?: number
  onClick?: () => void
}

export function NotificationBadge({
  unreadCount,
  onClick,
}: NotificationBadgeProps) {
  const { unreadCount: contextUnreadCount, openNotificationPanel } =
    useNotification()
  const count = unreadCount !== undefined ? unreadCount : contextUnreadCount
  const handleClick = onClick || openNotificationPanel

  return (
    <button
      onClick={handleClick}
      className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
      aria-label={`Notifications (${count} unread)`}
    >
      <Bell className="w-6 h-6 text-gray-600" />
      {count > 0 && (
        <span className="absolute top-1 right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
          {count > 9 ? '9+' : count}
        </span>
      )}
    </button>
  )
}
