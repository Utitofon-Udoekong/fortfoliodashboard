import { IncomingMessage, ServerResponse } from "http";
const {$db} = useNuxtApp()

export default (req: IncomingMessage, res: ServerResponse) => {
    let investments: any[]
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