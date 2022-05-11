// const {$db} = useNuxtApp()

import { IncomingMessage, ServerResponse } from "http";
// import { getFirestore } from 'firebase-admin/firestore'
// import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { db } from "~~/helpers/fireadmin";

// const apps = getApps()

// if (!apps.length) {
    // initializeApp({
    //     credential: cert('./serviceAccount.json') // 👈 Path to your JSON Firebase certificate
    // })
// }
export default async (req:IncomingMessage, res: ServerResponse) => {
    // const db = getFirestore()
    
    const investments = await db.collectionGroup("investments").get()
    if(investments.empty) return console.log("no investments")
   
    const investmentsData = investments.docs.map((doc) => {
        return {
            uuid: doc.id,
            ...doc.data()
        }
    })
    
    return investmentsData
}