import { IncomingMessage, ServerResponse } from "http";
import { db } from "~~/helpers/fireadmin";

export default async (req:IncomingMessage, res: ServerResponse) => {
    
    const kyc = await db.collection("kyc").get()
    if(kyc.empty) return []
   
    const kycData = kyc.docs.map((doc) => {
        return {
            uuid: doc.id,
            ...doc.data()
        }
    })
    
    return kycData
}