import { getApp, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from "firebase-admin/auth";
import {getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()
    const firebaseConfig = {
        apiKey: config.API_KEY,
        authDomain: config.AUTH_DOMAIN,
        projectId: config.PROJECT_ID,
        storageBucket: config.STORAGE_BUCKET,
        messagingSenderId: config.MESSAGING_SENDER_ID,
        appId: config.APP_ID,
        measurementId: config.MEASUREMENT_ID
    };
    let app;
    if (!getApps().length) {
        app = initializeApp(firebaseConfig);
    } else {
        app = getApp(); // if already initialized, use that one
    }

    const firebaseApp = app;
    const auth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp);
    const storage = getStorage(firebaseApp).bucket("KYC_DOCUMENTS")
    return {
        provide: {
            firebaseApp: firebaseApp,
            auth: auth,
            db: db,
            storage: storage
        }
    }
})