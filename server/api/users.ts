export default async (_: any,__: any) => {
    let users: any[]
    const {$db} = useNuxtApp()
    $db.collection("authUsers").onSnapshot((querysnapshot) => {
        if(querysnapshot.empty) return "No snapshot found for investments"
        else {
            users = querysnapshot.docs.map(doc => {
                return {
                    uid: doc.id,
                    ...doc.data()
                }
            })
        }
    })
    return users
}