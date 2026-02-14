import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore'
import { getFirebaseFirestore } from './client'
import { getFirebaseErrorMessage } from './firestore'
import { Product, CreateProductInput, UpdateProductInput } from './types'

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

export async function createProduct(
  storeId: string,
  input: CreateProductInput
): Promise<string> {
  if (!input.name || input.name.trim().length === 0) {
    throw new Error('Product name is required')
  }
  if (input.price === undefined || input.price === null || input.price < 0) {
    throw new Error('Product price must be a non-negative number')
  }
  if (
    input.stockQuantity === undefined ||
    input.stockQuantity === null ||
    input.stockQuantity < 0
  ) {
    throw new Error('Stock quantity must be a non-negative number')
  }

  try {
    const productsRef = collection(db, `stores/${storeId}/products`)
    const docRef = await addDoc(productsRef, {
      name: input.name.trim(),
      price: input.price,
      stockQuantity: input.stockQuantity,
      unit: input.unit || null,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })

    return docRef.id
  } catch (error) {
    console.error('Error creating product:', error)
    throw new Error(getFirebaseErrorMessage(error))
  }
}

export async function updateProduct(
  storeId: string,
  productId: string,
  input: UpdateProductInput
): Promise<void> {
  if (input.name !== undefined && input.name.trim().length === 0) {
    throw new Error('Product name cannot be empty')
  }
  if (input.price !== undefined && (input.price === null || input.price < 0)) {
    throw new Error('Product price must be a non-negative number')
  }
  if (
    input.stockQuantity !== undefined &&
    (input.stockQuantity === null || input.stockQuantity < 0)
  ) {
    throw new Error('Stock quantity must be a non-negative number')
  }

  try {
    const productRef = doc(db, `stores/${storeId}/products`, productId)
    const updateData: any = {
      updatedAt: Timestamp.now(),
    }

    if (input.name !== undefined) {
      updateData.name = input.name.trim()
    }
    if (input.price !== undefined) {
      updateData.price = input.price
    }
    if (input.stockQuantity !== undefined) {
      updateData.stockQuantity = input.stockQuantity
    }
    if (input.unit !== undefined) {
      updateData.unit = input.unit
    }

    await updateDoc(productRef, updateData)
  } catch (error) {
    console.error('Error updating product:', error)
    throw new Error(getFirebaseErrorMessage(error))
  }
}

export async function deleteProduct(
  storeId: string,
  productId: string
): Promise<void> {
  try {
    const productRef = doc(db, `stores/${storeId}/products`, productId)
    await deleteDoc(productRef)
  } catch (error) {
    console.error('Error deleting product:', error)
    throw new Error(getFirebaseErrorMessage(error))
  }
}
