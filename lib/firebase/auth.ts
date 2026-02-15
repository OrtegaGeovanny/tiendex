import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  User,
} from 'firebase/auth'
import { getFirebaseAuth } from './client'
import { getFirebaseErrorMessage } from './firestore'
import { createStore } from './stores'

export async function signUp(
  email: string,
  password: string,
  storeName?: string | null,
  user?: User | null
): Promise<void> {
  try {
    const auth = getFirebaseAuth()
    let authUser = user

    if (!authUser) {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      authUser = userCredential.user
    }

    if (authUser) {
      await createStore(authUser.uid, { name: storeName || null })
    }
  } catch (error) {
    console.error('Error signing up:', error)
    throw new Error(getFirebaseErrorMessage(error))
  }
}

export async function signIn(email: string, password: string): Promise<void> {
  try {
    const auth = getFirebaseAuth()
    await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    console.error('Error signing in:', error)
    throw new Error(getFirebaseErrorMessage(error))
  }
}

export async function signOut(): Promise<void> {
  try {
    const auth = getFirebaseAuth()
    await firebaseSignOut(auth)
  } catch (error) {
    console.error('Error signing out:', error)
    throw new Error(getFirebaseErrorMessage(error))
  }
}

export async function resetPassword(email: string): Promise<void> {
  try {
    const auth = getFirebaseAuth()
    await sendPasswordResetEmail(auth, email)
  } catch (error) {
    console.error('Error resetting password:', error)
    throw new Error(getFirebaseErrorMessage(error))
  }
}

export { getFirebaseAuth }
