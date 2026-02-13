import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut } from "firebase/auth";
import { getFirebaseAuth } from "./client";
import { getFirebaseErrorMessage } from "./firestore";

export async function signUp(email: string, password: string): Promise<void> {
  try {
    const auth = getFirebaseAuth();
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error signing up:", error);
    throw new Error(getFirebaseErrorMessage(error));
  }
}

export async function signIn(email: string, password: string): Promise<void> {
  try {
    const auth = getFirebaseAuth();
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error signing in:", error);
    throw new Error(getFirebaseErrorMessage(error));
  }
}

export async function signOut(): Promise<void> {
  try {
    const auth = getFirebaseAuth();
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw new Error(getFirebaseErrorMessage(error));
  }
}

export { getFirebaseAuth };
