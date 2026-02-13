# Ralph Progress Log

This file tracks progress across iterations. Agents update this file
after each iteration and it's included in prompts for context.

## Codebase Patterns (Study These First)

- **Firebase Singleton Pattern**: Initialize Firebase app, auth, and db once and reuse across the app (lib/firebase/client.ts)
- **Error Handling**: Centralize Firebase error messages with user-friendly translations (lib/firebase/firestore.ts)
- **Firestore Timestamps**: Always use Timestamp.now() for createdAt/updatedAt fields and convert to Date when needed
- **Security Rules**: Use helper functions in Firestore rules for cleaner, more maintainable permissions
- **Type Organization**: Separate types (types.ts) from operations (customers.ts) for better maintainability
- **Auth Context Pattern**: Use React Context with onAuthStateChanged for centralized auth state management across Next.js App Router

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

## 2025-02-13 - tiendexApp-sfb.13
- Implemented authentication context with AuthProvider wrapping the app
- Created login page with email/password form and error handling
- Created register page with email/password form and validation
- Created dashboard page with logout functionality
- Implemented ProtectedRoute component for route guards
- Updated root layout to include AuthProvider
- Added signUp function to auth.ts for user registration
- Files created: lib/contexts/AuthContext.tsx, components/ProtectedRoute.tsx, app/login/page.tsx, app/register/page.tsx, app/dashboard/page.tsx
- Files modified: lib/firebase/auth.ts, app/layout.tsx
- **Learnings:**
  - Next.js App Router requires "use client" directive for components using hooks (useEffect, useState, useContext)
  - ProtectedRoute component uses useEffect to redirect unauthenticated users to /login
  - AuthProvider uses onAuthStateChanged to maintain auth state and provides loading state
  - Router.push is used for client-side navigation in protected routes
  - Form validation happens client-side before Firebase auth calls
  - Context provider pattern ensures auth state is available throughout the app
---


