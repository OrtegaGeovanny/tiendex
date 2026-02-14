import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  runTransaction,
  Timestamp,
} from 'firebase/firestore'
import { getFirebaseFirestore } from './client'
import { getFirebaseErrorMessage } from './firestore'
import { Transaction, CreateTransactionInput } from './types'

const db = getFirebaseFirestore()

export async function createTransaction(
  storeId: string,
  input: CreateTransactionInput
): Promise<string> {
  try {
    const transactionsRef = collection(db, `stores/${storeId}/transactions`)
    const docRef = await addDoc(transactionsRef, {
      ...input,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })

    await runTransaction(db, async transaction => {
      const customerRef = doc(
        db,
        `stores/${storeId}/customers`,
        input.customerId
      )
      const customerDoc = await transaction.get(customerRef)

      if (!customerDoc.exists()) {
        throw new Error('Customer not found')
      }

      const customerData = customerDoc.data()
      const currentDebt = customerData.totalDebt || 0

      let newDebt = currentDebt
      if (input.type === 'credit') {
        newDebt = currentDebt + input.totalAmount
      } else if (input.type === 'payment') {
        if (input.totalAmount > currentDebt) {
          throw new Error('Payment amount cannot exceed outstanding balance')
        }
        newDebt = Math.max(0, currentDebt - input.totalAmount)
      }

      transaction.update(customerRef, {
        totalDebt: newDebt,
        updatedAt: Timestamp.now(),
      })
    })

    return docRef.id
  } catch (error) {
    console.error('Error creating transaction:', error)
    throw new Error(getFirebaseErrorMessage(error))
  }
}

export async function getTransaction(
  storeId: string,
  transactionId: string
): Promise<Transaction | null> {
  try {
    const docRef = doc(db, `stores/${storeId}/transactions`, transactionId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Transaction
    }
    return null
  } catch (error) {
    console.error('Error fetching transaction:', error)
    throw new Error(getFirebaseErrorMessage(error))
  }
}

export async function getTransactions(storeId: string): Promise<Transaction[]> {
  try {
    const transactionsRef = collection(db, `stores/${storeId}/transactions`)
    const q = query(transactionsRef, orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)

    const transactions: Transaction[] = []
    querySnapshot.forEach(doc => {
      transactions.push({ id: doc.id, ...doc.data() } as Transaction)
    })

    return transactions
  } catch (error) {
    console.error('Error fetching transactions:', error)
    throw new Error(getFirebaseErrorMessage(error))
  }
}

export async function getTransactionsByCustomer(
  storeId: string,
  customerId: string
): Promise<Transaction[]> {
  try {
    const transactionsRef = collection(db, `stores/${storeId}/transactions`)
    const q = query(
      transactionsRef,
      where('customerId', '==', customerId),
      orderBy('createdAt', 'desc')
    )
    const querySnapshot = await getDocs(q)

    const transactions: Transaction[] = []
    querySnapshot.forEach(doc => {
      transactions.push({ id: doc.id, ...doc.data() } as Transaction)
    })

    return transactions
  } catch (error) {
    console.error('Error fetching customer transactions:', error)
    throw new Error(getFirebaseErrorMessage(error))
  }
}
