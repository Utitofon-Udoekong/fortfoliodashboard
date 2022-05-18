import { IncomingMessage, ServerResponse } from "http";
import { db } from "~~/helpers/fireadmin";

export default async (request: IncomingMessage, response: ServerResponse) => {
    // let users: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>
    // const prom = new Promise((resolve, reject) => {
    //     var resolveOnce = (doc: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>) => {
    //         resolveOnce = () => void
    //             resolve(doc)
    //     };
    //     db.collection("authUsers").onSnapshot((querysnapshot) => {
    //         users = querysnapshot
    //         resolveOnce(querysnapshot)
    //     }, reject)
    // })
    // prom.then((folo) => {
    //     console.log(folo)
    // })
    const doc = db.collection('authUsers')
    let users = []
    return new Promise((resolve) => {
        var resolveOnce = (doc: unknown) => {
            resolveOnce = () => void
                resolve(doc)
        };
        doc.onSnapshot(querySnapshot => {
            querySnapshot.forEach(doc => {
                users.push({
                    uuid: doc.id,
                    ...doc.data()
                })
            })
            resolve(users)
            // const newUsers = querySnapshot.docs.map(q => ({ id: q.id, ...q.data()}))
        }, err => {
            console.log(`Encountered error: ${err}`);
        });
    })
    // // console.log(users)
    // // return db.collection('authUsers').onSnapshot
    // return plaugh
}