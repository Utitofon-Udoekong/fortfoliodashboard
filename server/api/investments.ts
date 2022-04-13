import { IncomingMessage, ServerResponse } from "http";

export default (req: IncomingMessage, res: ServerResponse) => {
    let investments: any[]
    const {$db} = useNuxtApp()
    $db.collection("authUsers").doc().collection("investments").onSnapshot((querysnapshot) => {
        if(querysnapshot.empty) return "No snapshot found for investments"
        else{
            investments = querysnapshot.docs.map(doc => {
                return {
                    uid: doc.id,
                    ...doc.data()
                }
            })
        }
    })
    return investments
}