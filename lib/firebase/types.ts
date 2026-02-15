import { Timestamp } from 'firebase/firestore'

export interface Store {
  id: string
  name?: string | null
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface CreateStoreInput {
  name?: string | null
}

export interface Customer {
  id: string
  name: string
  phone?: string | null
  totalDebt: number
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface CreateCustomerInput {
  name: string
  phone?: string | null
  totalDebt?: number
}

export interface UpdateCustomerInput {
  name?: string
  phone?: string | null
  totalDebt?: number
}

export interface Product {
  id: string
  name: string
  price: number
  stockQuantity: number
  unit?: string | null
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface CreateProductInput {
  name: string
  price: number
  stockQuantity: number
  unit?: string | null
}

export interface UpdateProductInput {
  name?: string
  price?: number
  stockQuantity: number
  unit?: string | null
}

export interface Transaction {
  id: string
  customerId: string
  customerName: string
  productId?: string | null
  productName?: string | null
  quantity?: number | null
  price?: number | null
  totalAmount: number
  type: 'credit' | 'payment'
  notes?: string | null
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface CreateTransactionInput {
  customerId: string
  customerName: string
  productId?: string | null
  productName?: string | null
  quantity?: number | null
  price?: number | null
  totalAmount: number
  type: 'credit' | 'payment'
  notes?: string | null
}

export interface Notification {
  id: string
  customerId: string
  customerName: string
  debtAmount: number
  message: string
  read: boolean
  dismissed: boolean
  createdAt: Timestamp
}

export interface CreateNotificationInput {
  customerId: string
  customerName: string
  debtAmount: number
  message: string
}

export interface CreateCustomerInput {
  name: string
  phone?: string | null
  totalDebt?: number
}

export interface UpdateCustomerInput {
  name?: string
  phone?: string | null
  totalDebt?: number
}

export interface Product {
  id: string
  name: string
  price: number
  stockQuantity: number
  unit?: string | null
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface CreateProductInput {
  name: string
  price: number
  stockQuantity: number
  unit?: string | null
}

export interface UpdateProductInput {
  name?: string
  price?: number
  stockQuantity?: number
  unit?: string | null
}

export interface Transaction {
  id: string
  customerId: string
  customerName: string
  productId?: string | null
  productName?: string | null
  quantity?: number | null
  price?: number | null
  totalAmount: number
  type: 'credit' | 'payment'
  notes?: string | null
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface CreateTransactionInput {
  customerId: string
  customerName: string
  productId?: string | null
  productName?: string | null
  quantity?: number | null
  price?: number | null
  totalAmount: number
  type: 'credit' | 'payment'
  notes?: string | null
}

export interface Notification {
  id: string
  customerId: string
  customerName: string
  debtAmount: number
  message: string
  read: boolean
  dismissed: boolean
  createdAt: Timestamp
}

export interface CreateNotificationInput {
  customerId: string
  customerName: string
  debtAmount: number
  message: string
}
