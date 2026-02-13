"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { NotificationPanel, NotificationBadge } from "@/components/NotificationPanel";
import { getUnreadNotifications, getNotifications, createNotification } from "@/lib/firebase/notifications";
import { getCustomersWithDebt } from "@/lib/firebase/customers";

function DashboardContent() {
  const { user, signOut } = useAuth();
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUnreadCount = useCallback(async () => {
    if (!user) return;
    try {
      const unread = await getUnreadNotifications(user.uid);
      setUnreadCount(unread.length);
    } catch (error) {
      console.error("Error fetching unread count:", error);
    }
  }, [user]);

  const checkForOverduePayments = useCallback(async () => {
    if (!user) return;
    try {
      const customersWithDebt = await getCustomersWithDebt(user.uid, 0);
      const existingNotifications = await getNotifications(user.uid);

      for (const customer of customersWithDebt) {
        const notificationExists = existingNotifications.some(
          (n) => n.customerId === customer.id && !n.dismissed
        );

        if (!notificationExists) {
          await createNotification(user.uid, {
            customerId: customer.id,
            customerName: customer.name,
            debtAmount: customer.totalDebt,
            message: `has an outstanding balance of $${customer.totalDebt.toFixed(2)}`,
          });
        }
      }

      fetchUnreadCount();
    } catch (error) {
      console.error("Error checking for overdue payments:", error);
    }
  }, [user, fetchUnreadCount]);

  useEffect(() => {
    if (user) {
      checkForOverduePayments();
    }
  }, [user, checkForOverduePayments]);

  const handleNotificationClick = () => {
    setNotificationPanelOpen(true);
  };

  const handleNotificationClose = useCallback(() => {
    setNotificationPanelOpen(false);
    fetchUnreadCount();
  }, [fetchUnreadCount]);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">TiendexApp</h1>
            </div>
            <div className="flex items-center space-x-4">
              <NotificationBadge
                unreadCount={unreadCount}
                onClick={handleNotificationClick}
              />
              <span className="text-gray-700 hidden sm:block">{user?.email}</span>
              <button
                onClick={signOut}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome to the Dashboard
              </h2>
              <p className="text-gray-600">
                You are successfully logged in as {user?.email}
              </p>
            </div>
          </div>
        </div>
      </main>

      <NotificationPanel
        isOpen={notificationPanelOpen}
        onClose={handleNotificationClose}
      />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
