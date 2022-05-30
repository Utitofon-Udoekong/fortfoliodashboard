import { db } from "~~/helpers/fireadmin";

export default async () => {
    
    const withdrawals = await db.collectionGroup("withdrawals").get()
    if(withdrawals.empty || !withdrawals) return []
   
    const withdrawalsData = withdrawals.docs.map((doc) => {
        return {
            uuid: doc.id,
            ...doc.data()
        }
    })
    
    return withdrawalsData
}