import { db } from "~~/helpers/fireadmin";


export default async () => {
    
    const investments = await db.collectionGroup("investments").get()
    if(investments.empty || !investments) return []
   
    const investmentsData = investments.docs.map((doc) => {
        return {
            uuid: doc.id,
            ...doc.data()
        }
    })
    
    return investmentsData
}