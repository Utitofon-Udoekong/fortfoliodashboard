import { IncomingMessage, ServerResponse } from "http";
import { db } from "~~/helpers/fireadmin";

export default async (request:IncomingMessage, response:ServerResponse) => {
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