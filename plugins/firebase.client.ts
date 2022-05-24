// import { getApp, getApps, initializeApp } from 'firebase/app';
// import { getAuth } from "firebase/auth";
// import {getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage';
// export default defineNuxtPlugin((nuxtApp) => {
//     const firebaseUser = useUser()
//     const config = useRuntimeConfig()
//     const firebaseConfig = {
//         apiKey: config.API_KEY,
//         authDomain: config.AUTH_DOMAIN,
//         projectId: config.PROJECT_ID,
//         storageBucket: config.STORAGE_BUCKET,
//         messagingSenderId: config.MESSAGING_SENDER_ID,
//         appId: config.APP_ID,
//         measurementId: config.MEASUREMENT_ID
//     };

//     const firebaseApp = initializeApp(firebaseConfig);
//     const auth = getAuth(firebaseApp);
    // const db = getFirestore(firebaseApp);
    // const storage = getStorage(firebaseApp)
    
//     nuxtApp.hooks.hook('app:mounted', () => {
//         // Listen to Supabase auth changes
//         auth.onIdTokenChanged(async(user) => {
//           if (user) {
//             const token = await user.getIdToken()
//             setServerSession(token)
//             firebaseUser.value = formatUser(user)
//           }
//           else {
//             setServerSession('')
//             firebaseUser.value = null
//           }
//         })
//       })

//     return {
//         provide: {
//             firebaseApp: firebaseApp,
//             auth: auth,
//             db: db,
//             storage: storage
//         }
//     }
    
// })

import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {
  getAuth,
} from "firebase/auth";
import { getStorage } from "firebase/storage";

export default defineNuxtPlugin((nuxtApp) => {

  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.API_KEY,
        authDomain: config.AUTH_DOMAIN,
        projectId: config.PROJECT_ID,
        storageBucket: config.STORAGE_BUCKET,
        messagingSenderId: config.MESSAGING_SENDER_ID,
        appId: config.APP_ID,
        measurementId: config.MEASUREMENT_ID
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  initUser();

  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const storage = getStorage(app)

  nuxtApp.vueApp.provide('auth', auth);
  nuxtApp.vueApp.provide('firestore', firestore);
  nuxtApp.vueApp.provide('storage', storage);
  nuxtApp.provide('auth', auth);
  nuxtApp.provide('firestore', firestore);
  nuxtApp.provide('storage', storage);

});