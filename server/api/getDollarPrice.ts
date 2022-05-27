import { doc, onSnapshot } from "firebase/firestore"


export default async () => {
    return await new Promise((resolve, reject) => {
        const {$firestore} = useNuxtApp()
        const config = useRuntimeConfig()
        console.log("EGO ID: %d",config.EGO_ID)
        onSnapshot(doc($firestore, "egoPrice", config.EGO_ID), (doc) => {
          const data = doc.data()
          if(data){
            resolve({data})
          }else{
            reject("No data found")
          }
        });
      })
}