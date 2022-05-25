import { getApp, getApps, initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
let app;
if (!getApps().length) {
    app = initializeApp({
        credential: cert('./serviceAccount.json') // 👈 Path to your JSON Firebase certificate
    });
} else {
    app = getApp(); // if already initialized, use that one
}

export const firebaseApp = app;
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp).bucket("news")