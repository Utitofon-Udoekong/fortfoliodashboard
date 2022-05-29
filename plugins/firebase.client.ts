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

  const app = initializeApp(firebaseConfig);
  // @ts-ignore
  self.FIREBASE_APPCHECK_DEBUG_TOKEN = "463cd0bb-4b76-48db-bc8b-589335c19622";

  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(config.FIREBASE_APPCHECK_DEBUG_TOKEN),
    isTokenAutoRefreshEnabled: true
  });

  initUser();

  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const storage = getStorage(app)
  return {
    provide: {
      firebaseApp: app,
      auth: auth,
      firestore: firestore,
      storage: storage
    }
  }

});