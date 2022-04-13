
export default (_: any,__: any) => {
    let withdrawals: any[]
    const {$db} = useNuxtApp()
    $db.collection("authUsers").doc().collection("withdrawals").onSnapshot((querysnapshot) => {
        if(querysnapshot.empty) return "No snapshot found for this collection"
        else{
            withdrawals = querysnapshot.docs.map(doc => {
                return {
                    uid: doc.id,
                    ...doc.data()
                }
            })
        }
    })
    return withdrawals
}