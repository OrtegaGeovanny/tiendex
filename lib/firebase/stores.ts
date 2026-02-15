import {
  collection,
  doc,
  getDoc,
  updateDoc,
  Timestamp,
} from 'firebase/firestore'
import { getFirebaseFirestore } from './client'
import { getFirebaseErrorMessage } from './firestore'
import { Store, CreateStoreInput } from './types'

const db = getFirebaseFirestore()

export async function createStore(
  storeId: string,
  input: CreateStoreInput
): Promise<void> {
  try {
    const storesRef = doc(db, 'stores', storeId)
    await updateDoc(storesRef, {
      ...input,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
  } catch (error) {
    console.error('Error creating store:', error)
    throw new Error(getFirebaseErrorMessage(error))
  }
}

export async function getStore(storeId: string): Promise<Store | null> {
  try {
    const docRef = doc(db, 'stores', storeId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Store
    }
    return null
  } catch (error) {
    console.error('Error fetching store:', error)
    throw new Error(getFirebaseErrorMessage(error))
  }
}

export async function updateStore(
  storeId: string,
  name?: string | null
): Promise<void> {
  try {
    const storeRef = doc(db, 'stores', storeId)
    await updateDoc(storeRef, {
      name,
      updatedAt: Timestamp.now(),
    })
  } catch (error) {
    console.error('Error updating store:', error)
    throw new Error(getFirebaseErrorMessage(error))
  }
}
