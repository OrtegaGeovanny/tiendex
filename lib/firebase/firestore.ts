import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  DocumentData,
  QueryDocumentSnapshot,
  Timestamp,
} from "firebase/firestore";
import { getFirebaseFirestore } from "./client";

const db = getFirebaseFirestore();

export const firebaseErrors: Record<string, string> = {
  "auth/invalid-email": "Invalid email address format",
  "auth/user-disabled": "This user account has been disabled",
  "auth/user-not-found": "No account found with this email",
  "auth/wrong-password": "Incorrect password",
  "auth/email-already-in-use": "An account with this email already exists",
  "auth/weak-password": "Password should be at least 6 characters",
  "auth/too-many-requests": "Too many attempts. Please try again later",
  "permission-denied": "You don't have permission to perform this action",
  "not-found": "Document not found",
  "already-exists": "Document already exists",
  "unavailable": "Service unavailable. Please try again later",
};

export function getFirebaseErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    const errorCode = (error as any).code;
    return firebaseErrors[errorCode] || error.message;
  }
  return "An unexpected error occurred. Please try again.";
}

export async function getDocument<T = DocumentData>(
  collectionPath: string,
  docId: string
): Promise<T | null> {
  try {
    const docRef = doc(db, collectionPath, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as T;
    }
    return null;
  } catch (error) {
    console.error("Error fetching document:", error);
    throw new Error(getFirebaseErrorMessage(error));
  }
}

export async function getCollection<T = DocumentData>(
  collectionPath: string
): Promise<T[]> {
  try {
    const collectionRef = collection(db, collectionPath);
    const querySnapshot = await getDocs(collectionRef);
    
    const documents: T[] = [];
    querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
      documents.push({ id: doc.id, ...doc.data() } as T);
    });
    
    return documents;
  } catch (error) {
    console.error("Error fetching collection:", error);
    throw new Error(getFirebaseErrorMessage(error));
  }
}

export async function createDocument<T extends DocumentData>(
  collectionPath: string,
  docId: string,
  data: T
): Promise<void> {
  try {
    const docRef = doc(db, collectionPath, docId);
    const docWithTimestamp = {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };
    await setDoc(docRef, docWithTimestamp);
  } catch (error) {
    console.error("Error creating document:", error);
    throw new Error(getFirebaseErrorMessage(error));
  }
}

export async function updateDocument<T extends DocumentData>(
  collectionPath: string,
  docId: string,
  data: Partial<T>
): Promise<void> {
  try {
    const docRef = doc(db, collectionPath, docId);
    const docWithTimestamp = {
      ...data,
      updatedAt: Timestamp.now(),
    };
    await updateDoc(docRef, docWithTimestamp);
  } catch (error) {
    console.error("Error updating document:", error);
    throw new Error(getFirebaseErrorMessage(error));
  }
}

export async function deleteDocument(
  collectionPath: string,
  docId: string
): Promise<void> {
  try {
    const docRef = doc(db, collectionPath, docId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting document:", error);
    throw new Error(getFirebaseErrorMessage(error));
  }
}

export function timestampToDate(timestamp: Timestamp | null): Date | null {
  if (!timestamp) return null;
  return timestamp.toDate();
}
