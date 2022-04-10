import { IncomingMessage, ServerResponse } from "http";

export default async (req: IncomingMessage, res: ServerResponse) => {
    let users: any[]
    const {$db} = useNuxtApp()
    $db.collection("authUsers").onSnapshot((querysnapshot) => {
        if(querysnapshot.empty) return "No snapshot found for investments"
        else {
            users = querysnapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })
        }
    })
    return users
}