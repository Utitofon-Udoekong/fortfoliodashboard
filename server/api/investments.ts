import { IncomingMessage, ServerResponse } from "http";
import { db } from "~~/helpers/fireadmin";


export default async (req:IncomingMessage, res: ServerResponse) => {
    
    const investments = await db.collectionGroup("investments").get()
    if(investments.empty) return []
   
    const investmentsData = investments.docs.map((doc) => {
        return {
            uuid: doc.id,
            ...doc.data()
        }
    })
    
    return investmentsData
}