//https://firebase.google.com/docs/auth/web/start

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, Firestore, getDoc, getFirestore, onSnapshot, updateDoc } from "firebase/firestore";
import { getDownloadURL, getMetadata, getStorage, ref, uploadString } from "firebase/storage";

import { useUserStore } from "~~/store/userStore";
export const saveFile = async (fullPath, file) => {
  const storage = getStorage();
  const imageRef = ref(storage, fullPath)
  const snapshot = await uploadString(imageRef, file, "data_url")
  if(snapshot){
    const downloadUrl = await getDownloadURL(snapshot.ref)
    const metadata = await getMetadata(imageRef)
    return {snapshot, downloadUrl, metadata}
  }
}

export const getDollarPrice = async (db: Firestore) => {
  const config = useRuntimeConfig()
  const docRef = doc(db, "egoPrice", config.EGO_ID);
  const docSnap = await getDoc(docRef);
  const docData = docSnap.data()
  if (docSnap.exists()) {
    const dollarToNaira = docData["dollarToNaira"]
    return dollarToNaira
  } else {
    return 0;
  }
}

export const changeDollarPrice = async (newPrice: number,db: Firestore) => {
  const config = useRuntimeConfig()
  const priceRef = doc(db, "egoPrice", config.EGO_ID);
  await updateDoc(priceRef, {
    dollarToNaira: newPrice
  });
  return {changed: true}
}

export const uploadFile = async (file) => {
  return await new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = async (e) => {
      const result = reader.result
      const {snapshot, downloadUrl, metadata} = await saveFile(`news/${file.name}`,result)
      if(snapshot){
        resolve({snapshot, downloadUrl, metadata})
      }else{
        reject()
      }
    }
  })
}
export const createUser = async (email: string, password: string) => {
  const auth = getAuth();
  const credentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  return credentials;
};

export const signInUser = async (email: string, password: string) => {
  const auth = getAuth();
  const credentials = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return credentials;
};

export const initUser = async () => {
  const auth = getAuth();
  const firebaseUser = useFirebaseUser();
  firebaseUser.value = auth.currentUser;

  const userCookie = useCookie("userCookie");

  const router = useRouter();

  const store = useUserStore()
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      await store.login()
    } else {
      router.replace("/login")
    }

    firebaseUser.value = user;

    // @ts-ignore
    userCookie.value = user; //ignore error because nuxt will serialize to json

    $fetch("/api/auth", {
      method: "POST",
      body: { user },
    });
  });
};

export const signOutUser = async () => {
  const auth = getAuth();
  const result = await auth.signOut();
  return result;
};
