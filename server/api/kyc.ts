import { db } from "~~/helpers/fireadmin";

export default async () => {
    
    const kyc = await db.collection("kyc").get()
    if(kyc.empty || !kyc) return []
   
    const kycData = kyc.docs.map((doc) => {
        return {
            uuid: doc.id,
            ...doc.data()
        }
    })
    
    return kycData
}