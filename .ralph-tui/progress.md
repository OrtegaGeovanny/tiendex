# Ralph Progress Log

This file tracks progress across iterations. Agents update this file
after each iteration and it's included in prompts for context.

## Codebase Patterns (Study These First)

- **Firebase Singleton Pattern**: Initialize Firebase app, auth, and db once and reuse across the app (lib/firebase/client.ts)
- **Error Handling**: Centralize Firebase error messages with user-friendly translations (lib/firebase/firestore.ts)
- **Firestore Timestamps**: Always use Timestamp.now() for createdAt/updatedAt fields and convert to Date when needed
- **Security Rules**: Use helper functions in Firestore rules for cleaner, more maintainable permissions
- **Type Organization**: Separate types (types.ts) from operations (customers.ts) for better maintainability

---


## 2025-02-13 - tiendexApp-sfb.18
- Implemented customer data model with TypeScript types and interfaces
- Created Customer interface with name, phone (optional), totalDebt, createdAt, updatedAt
- Created CreateCustomerInput and UpdateCustomerInput types for data operations
- Added helper functions for CRUD operations: getCustomer, getCustomers, getCustomersByName
- Verified Firestore security rules already in place for /stores/{storeId}/customers/{customerId}
- Files created: lib/firebase/types.ts, lib/firebase/customers.ts
- Files modified: lib/firebase/index.ts
- **Learnings:**
  - Security rules were already implemented from initial setup, no changes needed
  - Type organization pattern: keep types separate from business logic for clarity
  - Firestore collection structure follows pattern: /stores/{storeId}/collectionName/{documentId}
  - Helper functions leverage existing error handling from firestore.ts
---
---



