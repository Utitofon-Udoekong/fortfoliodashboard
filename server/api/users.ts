import { IncomingMessage, ServerResponse } from "http";

import { getFirestore } from 'firebase-admin/firestore'
import { initializeApp, getApps, cert } from 'firebase-admin/app'

const apps = getApps()

if (!apps.length) {
    initializeApp({
        credential: cert('./serviceAccount.json') // 👈 Path to your JSON Firebase certificate
    })
}

export default async (request:IncomingMessage, response:ServerResponse) => {
    const db = getFirestore()
    const usersSnap = await db.collection('authUsers').get()
    const users = usersSnap.docs.map(async doc => {
        const collection = await db.collection('authUsers').doc(doc.id).listCollections()
        return {
            uuid: doc.id,
            ...doc.data(),
            ...collection
        }
    })
    
    return users
}