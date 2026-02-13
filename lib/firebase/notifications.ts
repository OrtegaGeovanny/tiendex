import {
  collection,
  doc,
  addDoc,
  updateDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
  deleteDoc,
} from 'firebase/firestore'
import { getFirebaseFirestore } from './client'
import { getFirebaseErrorMessage } from './firestore'
import { Notification, CreateNotificationInput } from './types'

const db = getFirebaseFirestore()

export async function getNotification(
  storeId: string,
  notificationId: string
): Promise<Notification | null> {
  try {
    const docRef = doc(db, `stores/${storeId}/notifications`, notificationId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Notification
    }
    return null
  } catch (error) {
    console.error('Error fetching notification:', error)
    throw new Error(getFirebaseErrorMessage(error))
  }
}

export async function getNotifications(
  storeId: string
): Promise<Notification[]> {
  try {
    const notificationsRef = collection(db, `stores/${storeId}/notifications`)
    const q = query(
      notificationsRef,
      where('dismissed', '==', false),
      orderBy('createdAt', 'desc')
    )
    const querySnapshot = await getDocs(q)

    const notifications: Notification[] = []
    querySnapshot.forEach(doc => {
      notifications.push({ id: doc.id, ...doc.data() } as Notification)
    })

    return notifications
  } catch (error) {
    console.error('Error fetching notifications:', error)
    throw new Error(getFirebaseErrorMessage(error))
  }
}

export async function getUnreadNotifications(
  storeId: string
): Promise<Notification[]> {
  try {
    const notificationsRef = collection(db, `stores/${storeId}/notifications`)
    const q = query(
      notificationsRef,
      where('read', '==', false),
      where('dismissed', '==', false),
      orderBy('createdAt', 'desc')
    )
    const querySnapshot = await getDocs(q)

    const notifications: Notification[] = []
    querySnapshot.forEach(doc => {
      notifications.push({ id: doc.id, ...doc.data() } as Notification)
    })

    return notifications
  } catch (error) {
    console.error('Error fetching unread notifications:', error)
    throw new Error(getFirebaseErrorMessage(error))
  }
}

export async function createNotification(
  storeId: string,
  input: CreateNotificationInput
): Promise<string> {
  try {
    const notificationsRef = collection(db, `stores/${storeId}/notifications`)
    const docRef = await addDoc(notificationsRef, {
      ...input,
      read: false,
      dismissed: false,
      createdAt: Timestamp.now(),
    })

    return docRef.id
  } catch (error) {
    console.error('Error creating notification:', error)
    throw new Error(getFirebaseErrorMessage(error))
  }
}

export async function markNotificationAsRead(
  storeId: string,
  notificationId: string
): Promise<void> {
  try {
    const notificationRef = doc(
      db,
      `stores/${storeId}/notifications`,
      notificationId
    )
    await updateDoc(notificationRef, {
      read: true,
    })
  } catch (error) {
    console.error('Error marking notification as read:', error)
    throw new Error(getFirebaseErrorMessage(error))
  }
}

export async function dismissNotification(
  storeId: string,
  notificationId: string
): Promise<void> {
  try {
    const notificationRef = doc(
      db,
      `stores/${storeId}/notifications`,
      notificationId
    )
    await updateDoc(notificationRef, {
      dismissed: true,
    })
  } catch (error) {
    console.error('Error dismissing notification:', error)
    throw new Error(getFirebaseErrorMessage(error))
  }
}

export async function deleteNotification(
  storeId: string,
  notificationId: string
): Promise<void> {
  try {
    const notificationRef = doc(
      db,
      `stores/${storeId}/notifications`,
      notificationId
    )
    await deleteDoc(notificationRef)
  } catch (error) {
    console.error('Error deleting notification:', error)
    throw new Error(getFirebaseErrorMessage(error))
  }
}
