import { IncomingMessage, ServerResponse } from "http";
import { db } from "~~/helpers/fireadmin";

export default async (req:IncomingMessage, res: ServerResponse) => {
    
    const withdrawals = await db.collectionGroup("withdrawals").get()
    if(withdrawals.empty) return console.log("no withdrawals")
   
    const withdrawalsData = withdrawals.docs.map((doc) => {
        return {
            uuid: doc.id,
            ...doc.data()
        }
    })
    
    return withdrawalsData
}