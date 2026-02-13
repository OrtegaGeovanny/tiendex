'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react'
import { useAuth } from '@/lib/contexts/AuthContext'
import { getUnreadNotifications } from '@/lib/firebase/notifications'

interface NotificationContextType {
  notificationPanelOpen: boolean
  unreadCount: number
  openNotificationPanel: () => void
  closeNotificationPanel: () => void
  fetchUnreadCount: () => Promise<void>
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  const fetchUnreadCount = useCallback(async () => {
    if (!user) return
    try {
      const unread = await getUnreadNotifications(user.uid)
      setUnreadCount(unread.length)
    } catch (error) {
      console.error('Error fetching unread count:', error)
    }
  }, [user])

  const openNotificationPanel = useCallback(() => {
    setNotificationPanelOpen(true)
  }, [])

  const closeNotificationPanel = useCallback(() => {
    setNotificationPanelOpen(false)
    fetchUnreadCount()
  }, [fetchUnreadCount])

  return (
    <NotificationContext.Provider
      value={{
        notificationPanelOpen,
        unreadCount,
        openNotificationPanel,
        closeNotificationPanel,
        fetchUnreadCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    )
  }
  return context
}
