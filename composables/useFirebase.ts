//https://firebase.google.com/docs/auth/web/start

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { getDownloadURL, getMetadata, getStorage, ref, uploadString } from "firebase/storage";

import { useUserStore } from "~~/store/userStore";
const {$auth, $storage} = useNuxtApp()
export const saveFile = async (fullPath, file) => {
  const imageRef = ref($storage, fullPath)
  const snapshot = await uploadString(imageRef, file, "data_url")
  if(snapshot){
    const downloadUrl = await getDownloadURL(snapshot.ref)
    const metadata = await getMetadata(imageRef)
    return {snapshot, downloadUrl, metadata}
  }
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


export const signInUser = async (email: string, password: string) => {
  const credentials = await signInWithEmailAndPassword(
    $auth,
    email,
    password
  );
  return credentials;
};

export const initUser = async () => {
  const firebaseUser = useFirebaseUser();
  firebaseUser.value = $auth.currentUser;

  const userCookie = useCookie("userCookie");

  const router = useRouter();

  const store = useUserStore()
  onAuthStateChanged($auth, async (user) => {
    if (user) {
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
  const result = await $auth.signOut();
  return result;
};
