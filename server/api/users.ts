// const {$db} = useNuxtApp()

import { IncomingMessage, ServerResponse } from "http";
// import { useFirestore } from "~~/composables/useFirestore";

// export default async (_: any,res: any) => {
//     let users: any[]
   
//     $db.collection("authUsers").onSnapshot((querysnapshot) => {
//         if(querysnapshot.empty) return "No snapshot found for investments"
//         else {
//             users = querysnapshot.docs.map(doc => {
//                 return {
//                     uid: doc.id,
//                     ...doc.data()
//                 }
//             })
//         }
//     })
    // res.writeHead(200, { 'Content-Type': 'application/json' })
    // res.write(JSON.stringify(users))
    // res.end()
// }

// const foo = useFirestore()
// const firestore = foo.value

// export default async (req: IncomingMessage, res: ServerResponse) => {
//     let users: any[]
//     const collection = firestore.collection("authUsers").get();
//     users.push(...(await collection).docs)
//     // firestore.collection("authUsers").onSnapshot((querySnapshot) => {
//     //     if(querySnapshot.empty) return
//     //     users = querySnapshot.docs.map((doc) => {
//     //         return {
//     //             uid: doc.id,
//     //             ...doc.data()
//     //         }
//     //     })
//     // })
//     res.writeHead(200, { 'Content-Type': 'application/json' })
//     res.write(JSON.stringify(users))
//     // res.end()
// }

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
    const users = usersSnap.docs.map(doc => {
        return {
            uuid: doc.id,
            ...doc.data()
        }
    })
    
    return users
}