import { IncomingMessage, ServerResponse } from "http";
import { db } from "~~/helpers/fireadmin";

export default async (request:IncomingMessage, response:ServerResponse) => {
    // const db = getFirestore()
    // const usersSnap = await db.collection('authUsers').get();
    // if(usersSnap.empty) return "No user created"
    // const users = usersSnap.docs.map((doc) => {
    //     return {
            // uuid: doc.id,
            // ...doc.data(),
    //     }
    // })
    
    // return users
    let users = []
    db.collection('authUsers').onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            users.push({
                uuid: doc.id,
                ...doc.data(),
            });
        });

    })
    return users
}