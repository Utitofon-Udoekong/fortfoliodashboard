// const {$db} = useNuxtApp()

import { IncomingMessage, ServerResponse } from "http";
import { getFirestore } from 'firebase-admin/firestore'
import { initializeApp, getApps, cert } from 'firebase-admin/app'

const apps = getApps()

if (!apps.length) {
    initializeApp({
        credential: cert('./serviceAccount.json') // 👈 Path to your JSON Firebase certificate
    })
}
export default async (req:IncomingMessage, res: ServerResponse) => {
    const db = getFirestore()
    
    const withdrawals = await db.collection("withdrawals").get()
    if(withdrawals.empty) return console.log("no withdrawals")
   
    const withdrawalsData = withdrawals.docs.map((doc) => {
        return {
            uuid: doc.id,
            ...doc.data()
        }
    })
    
    return withdrawalsData
}