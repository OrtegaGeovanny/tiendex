import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
} from 'firebase/firestore'
import { getFirebaseFirestore } from './client'
import { getFirebaseErrorMessage } from './firestore'
import { Product, CreateProductInput } from './types'

const db = getFirebaseFirestore()

export async function getProduct(
  storeId: string,
  productId: string
): Promise<Product | null> {
  try {
    const docRef = doc(db, `stores/${storeId}/products`, productId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Product
    }
    return null
  } catch (error) {
    console.error('Error fetching product:', error)
    throw new Error(getFirebaseErrorMessage(error))
  }
}

export async function getProducts(storeId: string): Promise<Product[]> {
  try {
    const productsRef = collection(db, `stores/${storeId}/products`)
    const q = query(productsRef, orderBy('name', 'asc'))
    const querySnapshot = await getDocs(q)

    const products: Product[] = []
    querySnapshot.forEach(doc => {
      products.push({ id: doc.id, ...doc.data() } as Product)
    })

    return products
  } catch (error) {
    console.error('Error fetching products:', error)
    throw new Error(getFirebaseErrorMessage(error))
  }
}

export async function searchProductsByName(
  storeId: string,
  searchTerm: string
): Promise<Product[]> {
  try {
    const productsRef = collection(db, `stores/${storeId}/products`)
    const q = query(
      productsRef,
      where('name', '>=', searchTerm.toUpperCase()),
      where('name', '<=', searchTerm.toUpperCase() + '\uf8ff')
    )
    const querySnapshot = await getDocs(q)

    const products: Product[] = []
    querySnapshot.forEach(doc => {
      products.push({ id: doc.id, ...doc.data() } as Product)
    })

    return products
  } catch (error) {
    console.error('Error searching products:', error)
    throw new Error(getFirebaseErrorMessage(error))
  }
}
