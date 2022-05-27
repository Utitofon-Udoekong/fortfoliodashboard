import { getApp, getApps, initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
let app;
const config = useRuntimeConfig()
if (!getApps().length) {
    app = initializeApp({
        credential: cert('./serviceAccount.json'),
        storageBucket: config.STORAGE_BUCKET_URL
    });
} else {
    app = getApp(); 
}

export const firebaseApp = app;
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp).bucket()