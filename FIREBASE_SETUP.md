# Firebase Setup Instructions

This document provides step-by-step instructions for setting up Firebase for TiendexApp.

## Prerequisites

- Node.js and npm installed
- Firebase CLI (optional, for deploying rules): `npm install -g firebase-tools`

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name (e.g., "tiendexapp")
4. Choose your Firebase account settings
5. Click "Create project"
6. Wait for project creation to complete

## Step 2: Enable Authentication

1. In Firebase Console, go to **Build** > **Authentication**
2. Click **Get Started**
3. Select **Email/Password** sign-in provider
4. Enable it and click **Save**

## Step 3: Create Firestore Database

1. In Firebase Console, go to **Build** > **Firestore Database**
2. Click **Create database**
3. Choose a location (select one closest to your users)
4. Select **Start in Test mode** for now
5. Click **Enable**

## Step 4: Deploy Security Rules

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login to Firebase: `firebase login`
3. In your project root, run: `firebase init firestore`
4. Select "Use an existing project" and choose your Firebase project
5. When asked about rules file, select the existing `firestore.rules` file
6. Deploy rules: `firebase deploy --only firestore:rules`

Or manually:
1. Go to **Build** > **Firestore Database** > **Rules** tab
2. Copy the contents of `firestore.rules`
3. Paste into the Firebase Console rules editor
4. Click **Publish**

## Step 5: Get Firebase Configuration

1. In Firebase Console, go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click the web icon (</>)
4. Register the app (name it "TiendexApp Web")
5. Copy the `firebaseConfig` object values

## Step 6: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your Firebase configuration values:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

3. Restart your development server if it's running

## Step 7: Verify Setup

1. Start the development server: `npm run dev`
2. Open the browser console - you should not see any Firebase errors
3. The app should load without authentication errors

## Security Notes

- Never commit `.env.local` to version control
- The Firestore security rules ensure users can only access their own store's data
- One user = one store (user ID serves as store ID)
- Transactions are immutable for audit purposes

## Firestore Data Structure

```
stores/
  {userId}/           # userId serves as storeId
    products/
      {productId}
    customers/
      {customerId}
    transactions/
      {transactionId}
```

## Troubleshooting

### "Firebase configuration is incomplete"
- Check that all environment variables are set in `.env.local`
- Restart the development server after adding environment variables

### "permission-denied" errors
- Ensure Firestore security rules are deployed
- Check that you're logged in with the correct user

### Authentication not working
- Verify Email/Password provider is enabled in Firebase Console
- Check that your API key is correct

### Database not accessible
- Ensure Firestore is created (not Realtime Database)
- Check that you're in the correct region/location
