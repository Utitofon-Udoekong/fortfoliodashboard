import { IncomingMessage, ServerResponse } from "http";
import { db } from "~~/helpers/fireadmin";

// import { getFirestore } from 'firebase-admin/firestore'
// import { initializeApp, getApps, cert } from 'firebase-admin/app'

// const apps = getApps()
// if (!apps.length) {
//     initializeApp({
//         credential: cert('./serviceAccount.json') // 👈 Path to your JSON Firebase certificate
//     })
// }

export default async (request:IncomingMessage, response:ServerResponse) => {
    let usersSnap: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> 
    db.collection('authUsers').onSnapshot((querysnapshot) => {

        if(querysnapshot.empty) return "No user created"
        const users = usersSnap.docs.map((doc) => {
            return {
                uuid: doc.id,
                ...doc.data(),
            }
        })
        
        return users
    })
}