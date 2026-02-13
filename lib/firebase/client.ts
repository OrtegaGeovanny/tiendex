import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getFirebaseConfig, FirebaseConfig } from "./config";

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

export function initializeFirebaseClient(): { app: FirebaseApp; auth: Auth; db: Firestore } {
  if (app && auth && db) {
    return { app, auth, db };
  }

  const existingApps = getApps();
  if (existingApps.length > 0) {
    app = existingApps[0];
    auth = getAuth(app);
    db = getFirestore(app);
    return { app, auth, db };
  }

  try {
    const config = getFirebaseConfig();
    app = initializeApp(config);
    auth = getAuth(app);
    db = getFirestore(app);
    return { app, auth, db };
  } catch (error) {
    console.error("Failed to initialize Firebase:", error);
    throw new Error(
      "Failed to initialize Firebase. Please ensure environment variables are properly configured."
    );
  }
}

export function getFirebaseApp(): FirebaseApp {
  if (!app) {
    const { app: initializedApp } = initializeFirebaseClient();
    return initializedApp;
  }
  return app;
}

export function getFirebaseAuth(): Auth {
  if (!auth) {
    const { auth: initializedAuth } = initializeFirebaseClient();
    return initializedAuth;
  }
  return auth;
}

export function getFirebaseFirestore(): Firestore {
  if (!db) {
    const { db: initializedDb } = initializeFirebaseClient();
    return initializedDb;
  }
  return db;
}
