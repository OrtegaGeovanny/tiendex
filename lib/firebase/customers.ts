import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { getFirebaseFirestore } from "./client";
import { getFirebaseErrorMessage } from "./firestore";
import { Customer, CreateCustomerInput, UpdateCustomerInput } from "./types";

const db = getFirebaseFirestore();

export async function getCustomer(
  storeId: string,
  customerId: string
): Promise<Customer | null> {
  try {
    const docRef = doc(db, `stores/${storeId}/customers`, customerId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Customer;
    }
    return null;
  } catch (error) {
    console.error("Error fetching customer:", error);
    throw new Error(getFirebaseErrorMessage(error));
  }
}

export async function getCustomers(storeId: string): Promise<Customer[]> {
  try {
    const customersRef = collection(db, `stores/${storeId}/customers`);
    const querySnapshot = await getDocs(customersRef);

    const customers: Customer[] = [];
    querySnapshot.forEach((doc) => {
      customers.push({ id: doc.id, ...doc.data() } as Customer);
    });

    return customers;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw new Error(getFirebaseErrorMessage(error));
  }
}

export async function getCustomersByName(
  storeId: string,
  name: string
): Promise<Customer[]> {
  try {
    const customersRef = collection(db, `stores/${storeId}/customers`);
    const q = query(customersRef, where("name", "==", name));
    const querySnapshot = await getDocs(q);

    const customers: Customer[] = [];
    querySnapshot.forEach((doc) => {
      customers.push({ id: doc.id, ...doc.data() } as Customer);
    });

    return customers;
  } catch (error) {
    console.error("Error fetching customers by name:", error);
    throw new Error(getFirebaseErrorMessage(error));
  }
}
