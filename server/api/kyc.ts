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
export default async (req:IncomingMessage, res: ServerResponse) => {
    // const db = getFirestore()
    let kyc: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>
    db.collection("kyc").onSnapshot((querysnapshot) => {
        kyc = querysnapshot
    })
    if(kyc.empty) return console.log("no kyc")
   
    const kycData = kyc.docs.map((doc) => {
        return {
            uuid: doc.id,
            ...doc.data()
        }
    })
    
    return kycData
}