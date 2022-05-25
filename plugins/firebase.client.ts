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

// return {
//     provide: {
//         firebaseApp: firebaseApp,
//         auth: auth,
//         db: db,
//         storage: storage
//     }
// }

// })

import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check"
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
  // @ts-ignore
  self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(config.RECAPTCHA_SERVER_KEY),
    isTokenAutoRefreshEnabled: true
  });


  initUser();

  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const storage = getStorage(app)
  useState("storage",() => storage)
  return {
    provide: {
      firebaseApp: app,
      auth: auth,
      firestore: firestore,
      storage: storage
    }
  }

});