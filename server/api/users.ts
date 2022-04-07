import { IncomingMessage, ServerResponse } from "http";

export default async (req: IncomingMessage, res: ServerResponse) => {
    let users: any[]
    const {$db} = useNuxtApp()
    await $db.collection("authUsers").onSnapshot((querysnapshot) => {
        users = querysnapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })
    })
    return users
}