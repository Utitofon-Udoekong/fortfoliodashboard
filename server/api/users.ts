import { db } from "~~/helpers/fireadmin";

export default async () => {
    const usersSnap = await db.collection('authUsers').get();
    if(usersSnap.empty || !usersSnap) return []
    const users = usersSnap.docs.map((doc) => {
        return {
            uuid: doc.id,
            ...doc.data(),
        }
    })
    
    return users
}