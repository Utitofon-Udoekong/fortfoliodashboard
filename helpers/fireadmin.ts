import { getApp, getApps, initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
// const config = useRuntimeConfig()
// const firebaseConfig = {
//     apiKey: config.API_KEY,
//     authDomain: config.AUTH_DOMAIN,
//     projectId: config.PROJECT_ID,
//     storageBucket: config.STORAGE_BUCKET,
//     messagingSenderId: config.MESSAGING_SENDER_ID,
//     appId: config.APP_ID,
//     measurementId: config.MEASUREMENT_ID
// };
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
export const storage = getStorage(firebaseApp).bucket("KYC_DOCUMENTS")