'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/contexts/AuthContext'
import {
  NotificationProvider,
  useNotification,
} from '@/lib/contexts/NotificationContext'
import {
  NotificationPanel,
  NotificationBadge,
} from '@/components/NotificationPanel'
import {
  LayoutDashboard,
  Users,
  Package,
  PlusCircle,
  Settings,
  Menu,
  X,
  LogOut,
  ChevronDown,
  Bell,
  Store,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
  mobileOnly?: boolean
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    mobileOnly: false,
  },
  {
    label: 'Customers',
    href: '/dashboard/customers',
    icon: Users,
    mobileOnly: false,
  },
  {
    label: 'Products',
    href: '/dashboard/products',
    icon: Package,
    mobileOnly: false,
  },
  {
    label: 'Add Transaction',
    href: '/dashboard/transactions/new',
    icon: PlusCircle,
    mobileOnly: false,
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    mobileOnly: false,
  },
]

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const {
    notificationPanelOpen,
    openNotificationPanel,
    closeNotificationPanel,
  } = useNotification()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const isActiveRoute = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname.startsWith(href)
  }

  const handleSignOut = async () => {
    await signOut()
    setUserMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 overflow-y-auto">
          <div className="flex items-center justify-center h-16 border-b border-gray-200">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Store className="w-8 h-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">
                TiendexApp
              </span>
            </Link>
          </div>

          <nav className="flex-1 px-2 py-4 space-y-1">
            {navItems.map(item => {
              const Icon = item.icon
              const active = isActiveRoute(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    active
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 mr-3 transition-colors ${
                      active
                        ? 'text-indigo-600'
                        : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-2 text-gray-600 hover:text-gray-900 lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Store className="w-6 h-6 text-indigo-600" />
              <span className="text-lg font-bold text-gray-900">
                TiendexApp
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            <NotificationBadge />
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-indigo-700">
                    {user?.email?.[0].toUpperCase()}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    userMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1"
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {user?.email}
                      </p>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:flex lg:flex-col lg:pl-64">
        <div className="sticky top-0 z-40 flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
          <div className="flex-1"></div>
          <div className="flex items-center space-x-4">
            <NotificationBadge />
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-indigo-700">
                    {user?.email?.[0].toUpperCase()}
                  </span>
                </div>
                <span className="text-sm text-gray-700">{user?.email}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    userMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1"
                  >
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="absolute inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl">
              <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
                <Link href="/dashboard" className="flex items-center space-x-2">
                  <Store className="w-6 h-6 text-indigo-600" />
                  <span className="text-lg font-bold text-gray-900">
                    TiendexApp
                  </span>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 -mr-2 text-gray-600 hover:text-gray-900"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="px-2 py-4 space-y-1">
                {navItems.map(item => {
                  const Icon = item.icon
                  const active = isActiveRoute(item.href)

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`group flex items-center px-3 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
                        active
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 mr-3 transition-colors ${
                          active
                            ? 'text-indigo-600'
                            : 'text-gray-400 group-hover:text-gray-500'
                        }`}
                      />
                      {item.label}
                    </Link>
                  )
                })}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="lg:pl-64">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="py-6 sm:px-6 lg:px-8"
        >
          <div className="px-4 sm:px-0">{children}</div>
        </motion.div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.slice(0, 4).map(item => {
            const Icon = item.icon
            const active = isActiveRoute(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center flex-1 py-2 px-1 transition-all duration-200 ${
                  active ? 'text-indigo-600' : 'text-gray-500'
                }`}
              >
                <Icon
                  className={`w-6 h-6 mb-1 transition-colors ${
                    active ? 'text-indigo-600' : 'text-gray-400'
                  }`}
                />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            )
          })}
          <Link
            href="/dashboard/settings"
            className={`flex flex-col items-center justify-center flex-1 py-2 px-1 transition-all duration-200 ${
              isActiveRoute('/dashboard/settings')
                ? 'text-indigo-600'
                : 'text-gray-500'
            }`}
          >
            <Settings
              className={`w-6 h-6 mb-1 ${
                isActiveRoute('/dashboard/settings')
                  ? 'text-indigo-600'
                  : 'text-gray-400'
              }`}
            />
            <span className="text-xs font-medium">Settings</span>
          </Link>
        </div>
      </div>

      <NotificationPanel
        isOpen={notificationPanelOpen}
        onClose={closeNotificationPanel}
      />
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NotificationProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </NotificationProvider>
  )
}
