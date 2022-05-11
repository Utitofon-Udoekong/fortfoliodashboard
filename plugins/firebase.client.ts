import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import {getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
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

    const firebaseApp = initializeApp(firebaseConfig);
    const auth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp);
    const storage = getStorage(firebaseApp)
    
    return {
        provide: {
            firebaseApp: firebaseApp,
            auth: auth,
            db: db,
            storage: storage
        }
    }
})