import { Timestamp } from 'firebase/firestore'

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
  stockQuantity?: number
  unit?: string | null
}

export interface Transaction {
  id: string
  customerId: string
  customerName: string
  productId: string
  productName: string
  quantity: number
  price: number
  totalAmount: number
  type: 'credit' | 'payment'
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface CreateTransactionInput {
  customerId: string
  customerName: string
  productId: string
  productName: string
  quantity: number
  price: number
  totalAmount: number
  type: 'credit' | 'payment'
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
