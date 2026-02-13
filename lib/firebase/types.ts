import { Timestamp } from "firebase/firestore";

export interface Customer {
  id: string;
  name: string;
  phone?: string | null;
  totalDebt: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface CreateCustomerInput {
  name: string;
  phone?: string | null;
  totalDebt?: number;
}

export interface UpdateCustomerInput {
  name?: string;
  phone?: string | null;
  totalDebt?: number;
}
