
export default (_: any,__: any) => {
    let kycData: any[]
    const {$storage,$db} = useNuxtApp()
    $db.collection("authUsers").doc().collection("kyc").onSnapshot((querysnapshot) => {
        if(querysnapshot.empty) return "No document found in this collection"
        else {
            kycData = querysnapshot.docs.map(doc => {
                return {
                    uid: doc.id,
                    ...doc.data()
                }
            })
        }
    })
    return kycData
}