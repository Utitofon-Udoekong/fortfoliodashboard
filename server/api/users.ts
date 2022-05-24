import { IncomingMessage, ServerResponse } from "http";
import { snapshot } from "unstorage";
import { db } from "~~/helpers/fireadmin";

export default async (request: IncomingMessage, response: ServerResponse) => {
    const usersSnap = await db.collection('authUsers').get();
    if(usersSnap.empty) return []
    const users = usersSnap.docs.map((doc) => {
        return {
            uuid: doc.id,
            ...doc.data(),
        }
    })
    
    return users
}