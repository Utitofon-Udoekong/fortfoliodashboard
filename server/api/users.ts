import { IncomingMessage, ServerResponse } from "http";
import { db } from "~~/helpers/fireadmin";

export default async (request: IncomingMessage, response: ServerResponse) => {
    let users = []
    const doc = db.collection('authUsers')
    doc.onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
            users.push(doc.id)
            console.log(`Received query snapshot of size ${doc.id}`);
        })
        // ...
    }, err => {
        console.log(`Encountered error: ${err}`);
    });
    console.log(users)
    // return db.collection('authUsers').onSnapshot
}