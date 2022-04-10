import { IncomingMessage, ServerResponse } from "http";

export default (req: IncomingMessage, res: ServerResponse) => {
    let withdrawals: any[]
    const {$db} = useNuxtApp()
    $db.collection("authUsers").doc().collection("withdrawals").onSnapshot((querysnapshot) => {
        if(querysnapshot.empty) return "No snapshot found for this collection"
        else{
            withdrawals = querysnapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })
        }
    })
    return withdrawals
}