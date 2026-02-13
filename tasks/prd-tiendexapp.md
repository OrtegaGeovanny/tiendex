# PRD: TiendexApp - Credit & Inventory Management for Small Latin American Stores

## Overview

TiendexApp is a mobile-first SaaS web application designed for small local stores and family-owned businesses in Latin America. The product replaces the traditional paper notebook used to track products, inventory, customers, and credit ("fiado").

The system consists of:
1. **Marketing landing page** - Modern, bold, slightly brutalist design to attract store owners
2. **Private dashboard** - Minimal, fast interface for managing products, customers, and credit transactions

The MVP focuses on core functionality: product/customer management and streamlined credit tracking, with the primary view being a customer list showing who owes what.

## Goals

- Provide a faster, more reliable alternative to pen-and-paper record keeping
- Make credit tracking ("fiado") extremely simple: select product → select customer → done
- Enable store owners to see at a glance who owes money and how much
- Deliver a mobile-first experience that works seamlessly on smartphones
- Build trust with a modern, professional brand presence
- Support Spanish language with infrastructure for future multi-language expansion

## Quality Gates

These commands must pass for every user story:
- `npm run typecheck` - Type checking
- `npm run lint` - Linting

For UI stories, also include:
- Verify in browser using dev-browser skill (mobile and desktop viewports)

## User Stories

### US-001: Project Setup and Configuration
**Description:** As a developer, I want the Next.js project properly configured with TypeScript, Tailwind CSS, and essential tooling so that development follows best practices.

**Acceptance Criteria:**
- [ ] Next.js 14+ project initialized with TypeScript
- [ ] Tailwind CSS configured with mobile-first breakpoints
- [ ] shadcn/ui initialized and configured
- [ ] Framer Motion installed and ready to use
- [ ] ESLint and Prettier configured
- [ ] Project structure follows Next.js app directory conventions
- [ ] Environment variables template (.env.example) created

### US-002: Firebase Project Setup
**Description:** As a developer, I want Firebase configured for authentication and Firestore database so that the backend infrastructure is ready.

**Acceptance Criteria:**
- [ ] Firebase project created and configured
- [ ] Firebase SDK initialized in Next.js app
- [ ] Firestore database created with proper security rules
- [ ] Firebase Authentication enabled (email/password provider)
- [ ] Environment variables for Firebase config added
- [ ] Firebase client initialized with proper error handling

### US-003: i18n Infrastructure Setup
**Description:** As a developer, I want internationalization infrastructure configured so that the app launches in Spanish with support for future languages.

**Acceptance Criteria:**
- [ ] i18n library installed (next-intl or react-i18next)
- [ ] Spanish language files created (es.json)
- [ ] i18n provider configured in app layout
- [ ] Helper functions/hooks for translations created
- [ ] Default locale set to Spanish (es)
- [ ] Language detection/switching mechanism ready (even if only Spanish is available)

### US-004: Landing Page - Hero Section
**Description:** As a potential customer visiting the landing page, I want to immediately understand what TiendexApp does so that I can decide if it's relevant to my business.

**Acceptance Criteria:**
- [ ] Hero section with compelling headline in Spanish
- [ ] Subheadline explaining the core value proposition
- [ ] Primary CTA button ("Comenzar Gratis" or similar)
- [ ] Hero visual (illustration or image) representing small store owners
- [ ] Responsive layout (mobile-first, works on all screen sizes)
- [ ] Smooth entrance animation using Framer Motion
- [ ] Bold, modern typography matching brutalist aesthetic

### US-005: Landing Page - Problem/Solution Section
**Description:** As a store owner, I want to see how TiendexApp solves my specific pain points so that I understand why I need this tool.

**Acceptance Criteria:**
- [ ] "Problem" subsection highlighting pain points of paper notebooks
- [ ] "Solution" subsection showing how TiendexApp solves these problems
- [ ] Visual contrast between problem and solution (e.g., split layout)
- [ ] Clear, relatable copy in Spanish targeting small business owners
- [ ] Smooth scroll-triggered animations using Framer Motion
- [ ] Mobile-optimized layout (stacked sections on small screens)

### US-006: Landing Page - Features Section
**Description:** As a potential customer, I want to see the key features of TiendexApp so that I understand what functionality is included.

**Acceptance Criteria:**
- [ ] Feature cards/blocks for: Product Management, Customer Tracking, Credit ("Fiado"), Payment History
- [ ] Each feature has icon, title, and brief description
- [ ] Features displayed in grid layout (responsive)
- [ ] Hover/tap animations on feature cards using Framer Motion
- [ ] Icons are clear and professional (using lucide-react or similar)
- [ ] Section has clear heading and optional subheading

### US-007: Landing Page - Demo/Screenshots Section
**Description:** As a potential customer, I want to see what the dashboard looks like so that I can visualize using the product.

**Acceptance Criteria:**
- [ ] Section displays 2-3 static mockup screenshots of the dashboard
- [ ] Screenshots show key views: customer list, credit entry, product list
- [ ] Images are high-quality and properly optimized
- [ ] Mockups show mobile interface (since it's mobile-first)
- [ ] Layout is responsive with proper image sizing
- [ ] Optional: subtle parallax or scroll animation effect

### US-008: Landing Page - Pricing Section
**Description:** As a potential customer, I want to understand the pricing model so that I know if this fits my budget.

**Acceptance Criteria:**
- [ ] Pricing section with clear heading
- [ ] "Coming Soon" or "Free During Beta" message displayed prominently
- [ ] CTA to join waitlist or sign up for early access
- [ ] Clean, minimalist design
- [ ] Mobile-friendly layout

### US-009: Landing Page - Footer
**Description:** As a visitor, I want to find company information and important links in the footer so that I can learn more or contact support.

**Acceptance Criteria:**
- [ ] Company/product name and tagline
- [ ] Links to: Terms of Service, Privacy Policy, Contact
- [ ] Social media links (if applicable)
- [ ] Copyright notice
- [ ] Email contact or contact form link
- [ ] Responsive footer layout
- [ ] Matches the design aesthetic (bold, clean)

### US-010: Authentication - Login Page
**Description:** As a registered user, I want to log in to my account so that I can access my dashboard.

**Acceptance Criteria:**
- [ ] Login page at `/login` with email and password fields
- [ ] Form validation (email format, required fields)
- [ ] "Log In" button triggers Firebase authentication
- [ ] Loading state during authentication
- [ ] Error messages for invalid credentials
- [ ] "Forgot Password?" link
- [ ] "Don't have an account? Sign up" link to registration
- [ ] Mobile-optimized form layout
- [ ] Successful login redirects to dashboard

### US-011: Authentication - Registration Page
**Description:** As a new user, I want to create an account so that I can start using TiendexApp.

**Acceptance Criteria:**
- [ ] Registration page at `/register` with email, password, confirm password fields
- [ ] Optional: store name field during registration
- [ ] Form validation (email format, password strength, matching passwords)
- [ ] "Sign Up" button creates Firebase user account
- [ ] Loading state during registration
- [ ] Error messages for existing email or weak password
- [ ] "Already have an account? Log in" link
- [ ] Mobile-optimized form layout
- [ ] Successful registration redirects to dashboard or onboarding

### US-012: Authentication - Password Reset
**Description:** As a user who forgot my password, I want to reset it via email so that I can regain access to my account.

**Acceptance Criteria:**
- [ ] Password reset page at `/reset-password`
- [ ] Email input field with validation
- [ ] "Send Reset Email" button triggers Firebase password reset
- [ ] Success message confirming email was sent
- [ ] Error handling for invalid email or Firebase errors
- [ ] Link back to login page
- [ ] Mobile-optimized layout

### US-013: Protected Routes and Navigation Guards
**Description:** As a developer, I want authenticated routes protected so that only logged-in users can access the dashboard.

**Acceptance Criteria:**
- [ ] Authentication context/provider wraps the app
- [ ] Dashboard routes require authentication
- [ ] Unauthenticated users redirected to `/login`
- [ ] Authenticated users on `/login` or `/register` redirected to dashboard
- [ ] Loading state while checking authentication status
- [ ] Logout functionality implemented and accessible from dashboard

### US-014: Dashboard Layout and Navigation
**Description:** As a logged-in user, I want a clean dashboard layout with navigation so that I can access different sections of the app.

**Acceptance Criteria:**
- [ ] Dashboard layout with sidebar (desktop) or bottom nav (mobile)
- [ ] Navigation items: Customers, Products, Add Transaction, Settings
- [ ] Active route highlighted in navigation
- [ ] App logo/name in header
- [ ] User menu with logout option
- [ ] Responsive layout (sidebar collapses to hamburger/bottom nav on mobile)
- [ ] Smooth transitions between pages using Framer Motion
- [ ] Mobile-first design with touch-friendly targets

### US-015: Product Data Model
**Description:** As a developer, I want a clear Firestore data model for products so that product data is structured consistently.

**Acceptance Criteria:**
- [ ] Firestore collection structure defined: `/stores/{storeId}/products/{productId}`
- [ ] Product schema includes: name, price, stockQuantity, unit (optional), createdAt, updatedAt
- [ ] TypeScript interfaces/types created for Product
- [ ] Firestore security rules allow authenticated users to CRUD their own store's products
- [ ] Helper functions for creating/updating products with validation

### US-016: Product List View
**Description:** As a store owner, I want to see all my products in a list so that I can view and manage my inventory.

**Acceptance Criteria:**
- [ ] Products page at `/dashboard/products`
- [ ] Display products in list/grid format
- [ ] Each product shows: name, price, stock quantity
- [ ] Search/filter functionality by product name
- [ ] "Add Product" button navigates to add product form
- [ ] Tap/click on product navigates to edit form
- [ ] Empty state when no products exist
- [ ] Loading state while fetching products
- [ ] Mobile-optimized list view with swipe actions or clear CTAs

### US-017: Add/Edit Product Form
**Description:** As a store owner, I want to add and edit products so that I can keep my inventory up to date.

**Acceptance Criteria:**
- [ ] Add product page at `/dashboard/products/new`
- [ ] Edit product page at `/dashboard/products/[id]/edit`
- [ ] Form fields: name (required), price (required), stock quantity, unit
- [ ] Form validation (required fields, price is positive number)
- [ ] "Save" button creates/updates product in Firestore
- [ ] Success feedback after saving
- [ ] Error handling for Firebase errors
- [ ] "Cancel" button returns to product list
- [ ] Mobile-optimized form with appropriate input types (numeric keyboard for price)
- [ ] Optional: delete product functionality with confirmation dialog

### US-018: Customer Data Model
**Description:** As a developer, I want a clear Firestore data model for customers so that customer data is structured consistently.

**Acceptance Criteria:**
- [ ] Firestore collection structure: `/stores/{storeId}/customers/{customerId}`
- [ ] Customer schema includes: name, phone (optional), totalDebt (computed), createdAt, updatedAt
- [ ] TypeScript interfaces/types created for Customer
- [ ] Firestore security rules allow authenticated users to CRUD their own store's customers
- [ ] Helper functions for creating/updating customers

### US-019: Customer List with Outstanding Balances
**Description:** As a store owner, I want to see a list of all my customers with their outstanding balances so that I know who owes money at a glance.

**Acceptance Criteria:**
- [ ] Customers page at `/dashboard/customers` (default dashboard view)
- [ ] Display customers in list format
- [ ] Each customer shows: name, total debt amount (highlighted if > 0)
- [ ] Sort by: highest debt first (default), alphabetical, recent activity
- [ ] Search/filter by customer name
- [ ] Visual indicator for customers with overdue balances (e.g., red badge)
- [ ] "Add Customer" button navigates to add customer form
- [ ] Tap/click on customer navigates to customer detail view
- [ ] Empty state when no customers exist
- [ ] Loading state while fetching data
- [ ] Mobile-optimized with large, readable debt amounts

### US-020: Add/Edit Customer Form
**Description:** As a store owner, I want to add and edit customer information so that I can keep accurate records.

**Acceptance Criteria:**
- [ ] Add customer page at `/dashboard/customers/new`
- [ ] Edit customer page at `/dashboard/customers/[id]/edit`
- [ ] Form fields: name (required), phone number (optional)
- [ ] Form validation (name is required)
- [ ] "Save" button creates/updates customer in Firestore
- [ ] Success feedback after saving
- [ ] Error handling for Firebase errors
- [ ] "Cancel" button returns to customer list
- [ ] Mobile-optimized form

### US-021: Customer Detail View with Transaction History
**Description:** As a store owner, I want to view a customer's complete transaction history so that I can see what they've purchased and paid.

**Acceptance Criteria:**
- [ ] Customer detail page at `/dashboard/customers/[id]`
- [ ] Display customer name and total outstanding balance prominently
- [ ] Transaction history list showing: date, type (credit/payment), product name (for credits), amount
- [ ] Transactions sorted by most recent first
- [ ] Running balance calculation after each transaction
- [ ] "Record Payment" button (quick action)
- [ ] "Give Credit" button (quick action)
- [ ] Empty state when no transactions exist
- [ ] Mobile-optimized with clear visual hierarchy

### US-022: Transaction Data Model
**Description:** As a developer, I want a clear Firestore data model for transactions so that credits and payments are tracked consistently.

**Acceptance Criteria:**
- [ ] Firestore collection structure: `/stores/{storeId}/transactions/{transactionId}`
- [ ] Transaction schema includes: customerId, type ("credit" | "payment"), amount, productId (for credits), productName (denormalized for credits), timestamp, notes (optional)
- [ ] TypeScript interfaces/types created for Transaction
- [ ] Firestore security rules allow authenticated users to CRUD their own store's transactions
- [ ] Cloud Function or client-side logic to update customer totalDebt when transaction is created

### US-023: Quick Credit Entry Workflow
**Description:** As a store owner, I want to quickly record when a customer takes a product on credit so that I can track what they owe in seconds.

**Acceptance Criteria:**
- [ ] "Add Transaction" page at `/dashboard/transactions/new` or modal
- [ ] Step 1: Select or search for product (autocomplete/searchable dropdown)
- [ ] Product selection shows current price
- [ ] Step 2: Select or search for customer (autocomplete/searchable dropdown)
- [ ] Optional: allow quantity input (defaults to 1)
- [ ] Amount auto-calculated as product price × quantity
- [ ] "Record Credit" button creates transaction and updates customer debt
- [ ] Success feedback with option to record another transaction
- [ ] Error handling for missing data or Firebase errors
- [ ] Mobile-optimized with large touch targets
- [ ] Entire flow completable in under 10 seconds

### US-024: Payment Recording
**Description:** As a store owner, I want to record when a customer makes a payment so that their outstanding balance is reduced.

**Acceptance Criteria:**
- [ ] Payment recording accessible from customer detail page or transactions page
- [ ] Form shows customer name and current debt
- [ ] Amount input field (defaults to full debt amount)
- [ ] Option to record partial payment
- [ ] Optional notes field
- [ ] "Record Payment" button creates payment transaction and reduces customer debt
- [ ] Success feedback showing new balance
- [ ] Error handling (e.g., payment exceeds debt triggers warning)
- [ ] Mobile-optimized numeric keyboard for amount entry

### US-025: In-App Notifications for Overdue Payments
**Description:** As a store owner, I want to see notifications for customers with overdue or high balances so that I can follow up with them.

**Acceptance Criteria:**
- [ ] Notification badge/icon in dashboard header
- [ ] Clicking badge opens notification panel
- [ ] Notifications show: "Customer X has outstanding balance of $Y"
- [ ] Logic: flag customers with debt > certain threshold or debt older than N days
- [ ] Tapping notification navigates to customer detail page
- [ ] Mark notification as read/dismiss functionality
- [ ] Notifications persist until debt is paid or dismissed
- [ ] Mobile-optimized notification panel

### US-026: Dashboard UI Component Library Setup
**Description:** As a developer, I want shadcn/ui components configured and customized so that the dashboard has a consistent, modern design system.

**Acceptance Criteria:**
- [ ] Core shadcn/ui components installed: Button, Input, Card, Dialog, DropdownMenu, Badge, Separator
- [ ] Components customized with brand colors and styles
- [ ] Dark mode support (optional for MVP but infrastructure ready)
- [ ] Form components configured with react-hook-form integration
- [ ] Loading spinners and skeleton components ready
- [ ] Toast/notification component for success/error messages

### US-027: Responsive Mobile-First Layout Polish
**Description:** As a store owner using a smartphone, I want the entire dashboard to be smooth and touch-friendly so that I can efficiently manage my store from my phone.

**Acceptance Criteria:**
- [ ] All dashboard pages tested on mobile viewport (375px, 414px widths)
- [ ] Touch targets are minimum 44px × 44px
- [ ] Forms use appropriate mobile input types (tel, number, email)
- [ ] Navigation is accessible with one hand (bottom nav or hamburger)
- [ ] No horizontal scrolling on any page
- [ ] Fast page transitions (< 300ms)
- [ ] Subtle Framer Motion animations on page transitions and interactions
- [ ] Content readability (font sizes, contrast) verified on small screens

### US-028: Vercel Deployment Setup
**Description:** As a developer, I want the app deployed to Vercel with proper environment configuration so that it's accessible online.

**Acceptance Criteria:**
- [ ] Vercel project created and linked to Git repository
- [ ] Environment variables configured in Vercel dashboard (Firebase config)
- [ ] Production deployment successful and accessible via URL
- [ ] Custom domain configured (if available) or using vercel.app subdomain
- [ ] Automatic deployments on push to main branch
- [ ] Preview deployments for pull requests configured

### US-029: Firestore Security Rules
**Description:** As a developer, I want comprehensive Firestore security rules so that users can only access their own store's data.

**Acceptance Criteria:**
- [ ] Security rules allow authenticated users to read/write only their own store data
- [ ] Store ID tied to user UID (one user = one store)
- [ ] Products collection: users can only CRUD `/stores/{userId}/products/**`
- [ ] Customers collection: users can only CRUD `/stores/{userId}/customers/**`
- [ ] Transactions collection: users can only CRUD `/stores/{userId}/transactions/**`
- [ ] Rules tested with Firebase emulator or Firestore rules playground
- [ ] Rules deployed to Firebase project

## Functional Requirements

**Landing Page:**
- FR-1: The landing page must load in under 3 seconds on 3G mobile connection
- FR-2: All copy and content must be in Spanish
- FR-3: The design must use bold typography, high contrast, and smooth scroll-triggered animations
- FR-4: The page must be fully responsive from 320px to 1920px viewports
- FR-5: CTAs must lead to registration page when clicked

**Authentication:**
- FR-6: Users must register with email and password (min 6 characters)
- FR-7: Users must receive email verification (optional for MVP, but infrastructure ready)
- FR-8: Password reset must send email via Firebase Auth
- FR-9: Sessions must persist across browser refreshes
- FR-10: Unauthenticated users must not access dashboard routes

**Dashboard - Products:**
- FR-11: Store owners must be able to create, read, update, and delete products
- FR-12: Product prices must support decimal values (e.g., 50.99)
- FR-13: Stock quantity must be optional but display "N/A" if not set
- FR-14: Product search must be case-insensitive and match partial names

**Dashboard - Customers:**
- FR-15: Store owners must be able to create, read, update, and delete customers
- FR-16: Customer total debt must be auto-calculated from transactions
- FR-17: Customer list must sort by highest debt by default
- FR-18: Customers with debt > 0 must be visually distinguished

**Dashboard - Transactions:**
- FR-19: Recording a credit transaction must decrease product stock (if tracked) and increase customer debt
- FR-20: Recording a payment must decrease customer debt
- FR-21: Transactions must be immutable (no editing after creation) or include audit trail if editing is allowed
- FR-22: Transaction history must display in reverse chronological order
- FR-23: The quick credit entry flow must complete in 3 taps/clicks maximum

**Notifications:**
- FR-24: In-app notifications must appear for customers with debt > configurable threshold (default: $100 or local equivalent)
- FR-25: Notifications must be dismissable
- FR-26: Notification count must display in dashboard header badge

**Performance:**
- FR-27: Dashboard pages must load in under 2 seconds on 4G mobile
- FR-28: All user actions (form submissions, navigation) must provide immediate visual feedback
- FR-29: Firestore queries must use proper indexing for optimal performance

## Non-Goals (Out of Scope for MVP)

- Multi-store management (one user = multiple stores)
- Team collaboration (multiple users per store)
- Data export features (PDF reports, CSV export)
- Email or SMS notifications to customers about their debt
- Payment gateway integration for accepting online payments
- Barcode/QR code scanning for products
- Inventory restocking alerts
- Sales analytics and reporting dashboard
- Multi-currency support
- WhatsApp integration for customer communication
- Native mobile apps (iOS/Android)
- Offline-first functionality with local sync
- Automatic payment reminders via SMS/WhatsApp
- Customer-facing portal where they can view their own debt

## Technical Considerations

**Tech Stack:**
- Frontend: Next.js 14+, React, TypeScript, Tailwind CSS
- UI Components: shadcn/ui
- Animations: Framer Motion
- Backend: Firebase (Firestore + Authentication)
- Hosting: Vercel
- Internationalization: next-intl or react-i18next

**Data Model:**
- Firestore structure: `/stores/{userId}/` with subcollections for products, customers, transactions
- One user = one store (userId serves as storeId)
- Denormalize product names in transactions for historical accuracy
- Use Firestore listeners for real-time updates (optional) or standard queries

**Mobile-First Considerations:**
- Design for 375px viewport first, scale up
- Use appropriate input types for mobile keyboards
- Touch targets minimum 44px
- Minimize network requests and payload sizes
- Use optimistic UI updates for perceived performance

**Animations:**
- Page transitions: 200-300ms fade or slide
- Micro-interactions: button clicks, form submissions (subtle scale/pulse)
- Scroll animations: sections fade in on scroll (Framer Motion + Intersection Observer)
- Keep animations under 500ms to maintain fast feel

**i18n Infrastructure:**
- Set up translation keys structure even if only Spanish is used
- Translation files: `locales/es.json`, `locales/en.json` (empty for now)
- Language detection based on browser locale or manual selection (future)

## Success Metrics

- **User Acquisition:** 50+ beta signups in first month post-launch
- **User Engagement:** Users record at least 10 transactions in their first week
- **Performance:** 95% of pages load under 2 seconds on 4G mobile
- **Mobile Usage:** 80%+ of traffic comes from mobile devices
- **Retention:** 60%+ of users return within 7 days of signup
- **User Feedback:** Qualitative feedback confirms it's "faster than paper"

## Open Questions

- Should we add a simple onboarding tutorial/tour for first-time users?
- Do we need a "quick actions" widget on the dashboard home for frequent tasks?
- Should product stock auto-decrement when credit is given, or should this be optional per-product?
- What currency symbol should we use by default? (MXN $, COP $, ARS $, etc. - may need user setting)
- Should we implement soft deletes for products/customers to preserve transaction history integrity?
- Do we want to add a "notes" field to credit transactions for context (e.g., "2 bottles of soda")?
