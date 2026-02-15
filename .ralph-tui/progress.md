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
- **Landing Page Pattern**: Use server components for static landing pages with Tailwind CSS for responsive design. Break sections into focused components for maintainability.
- **Client Component Pattern**: Use "use client" directive for components using hooks (useState, useEffect, motion from framer-motion) or interactive features
- **Framer Motion Animations**: Use whileHover and whileTap for interactive card animations with spring physics for smooth feel
- **Responsive Grid Layout**: Use Tailwind grid with responsive classes (grid-cols-1 md:grid-cols-2 lg:grid-cols-4) for adaptive layouts
- **CRUD Form Pattern**: Separate add and edit pages that share similar form structure and validation with large touch targets (py-4), text-lg inputs, and stacked layouts for mobile-first design
- **Success/Error Feedback Pattern**: Use motion components with initial and animate states for smooth appearance of error/success messages. Use AlertCircle for errors and CheckCircle for success with appropriate color schemes
- **Auth Page Pattern**: Use motion.div for card entrance with blur-3xl background gradients. Center content with max-w-md, use consistent form styling with icons positioned absolutely inside input fields (pl-10)
- **Password Reset Pattern**: Add link from login page below password input. Reset page includes success state, disables button while loading, and links back to login after sending email
- **Delete Confirmation Pattern**: Use fixed inset overlay with centered modal dialog. Include two buttons: Cancel (secondary style) and Delete (danger style with red colors). Show loading state on delete button with disabled states.

## [Feb 14, 2026] - tiendexApp-sfb.12

- Implemented password reset functionality with Firebase
- Created `/reset-password` page with email form
- Added `resetPassword` function to lib/firebase/auth.ts
- Added "Forgot password?" link on login page
- Fixed corrupted types.ts file with proper TypeScript interfaces
- Fixed type errors in dashboard/page.tsx and NotificationPanel.tsx

**Files changed:**

- lib/firebase/auth.ts (added resetPassword function)
- app/reset-password/page.tsx (new file)
- app/login/page.tsx (added link to reset password)
- lib/firebase/types.ts (fixed and added missing properties)

**Learnings:**

- Firebase password reset uses sendPasswordResetEmail from 'firebase/auth'
- Import sendPasswordResetEmail alongside other auth functions
- Reset password pages should follow same UI patterns as login/register for consistency
- Optional properties in TypeScript interfaces need proper null checks (e.g., notification.debtAmount)
- CreateNotificationInput needed type field and optional debtAmount for dashboard notifications

---

## [Feb 14, 2026] - tiendexApp-sfb.17

- Verified add/edit product forms already implemented
- Added delete product functionality with confirmation dialog to edit page
- Forms include: name (required), price (required), stock quantity, unit (optional)
- Form validation for required fields and positive numbers
- Success and error feedback with motion components
- Mobile-optimized with inputMode for numeric fields
- Cancel button navigates back to product list

**Files changed:**

- app/dashboard/products/[id]/edit/page.tsx (added delete functionality)

**Learnings:**

- CRUD forms follow consistent pattern across the codebase
- Use inputMode="decimal" for price fields and inputMode="numeric" for quantity
- Confirmation dialogs use fixed inset overlay with centered modal
- Delete buttons should use danger styling (red colors) to indicate destructive action
- Import functions dynamically when needed (updateProduct, deleteProduct) to optimize initial load

---
