//https://firebase.google.com/docs/auth/web/start

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, Firestore, getDoc, getFirestore, onSnapshot, updateDoc } from "firebase/firestore";
import { deleteObject, FirebaseStorage, getDownloadURL, getMetadata, getStorage, listAll, ref, StorageReference, uploadString } from "firebase/storage";

import { useUserStore } from "~~/store/userStore";
export const saveFile = async (fullPath: string, file, storage: FirebaseStorage) => {
  const imageRef = ref(storage, fullPath)
  const snapshot = await uploadString(imageRef, file, "data_url")
  if(snapshot){
    const downloadUrl = await getDownloadURL(snapshot.ref)
    return {snapshot,downloadUrl}
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

// export const listNews = async (storage: FirebaseStorage) => {
//   return await new Promise((resolve, reject) => {
//     const listRef = ref(storage, 'news');
//     const newsList = []
//     listAll(listRef)
//     .then((res) => {
//       res.items.forEach(async (itemRef) => {
//         const url = await getDownloadURL(itemRef)
//         newsList.push({
//           ref: itemRef,
//           url: url
//         })
//       });
//       resolve(newsList)
//     })
//   })
// }

export const deleteNews = async (ref: StorageReference) => {
  await deleteObject(ref)
}

export const changeDollarPrice = async (newPrice: number,db: Firestore) => {
  const config = useRuntimeConfig()
  const priceRef = doc(db, "egoPrice", config.EGO_ID);
  await updateDoc(priceRef, {
    dollarToNaira: newPrice
  });
  return {changed: true}
}

export const uploadFile = async (file, storage) => {
  return await new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = async (e) => {
      const result = reader.result
      const {downloadUrl, snapshot} = await saveFile(`news/${file.name}`,result, storage)
      if(snapshot){
        resolve({downloadUrl})
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
      await store.login()
    } else {
      router.replace("/login")
    }

    firebaseUser.value = user;

    // @ts-ignore
    userCookie.value = user;

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
