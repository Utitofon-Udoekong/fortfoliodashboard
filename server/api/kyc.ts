import { IncomingMessage, ServerResponse } from "http";
// import { ref } from "@firebase/storage";

export default (req: IncomingMessage, res: ServerResponse) => {
    let kycData: any[]
    const {$storage,$db} = useNuxtApp()
    // const kycRef = ref(storage,"KYC_DOCUMENTS/uid")
    // const frontQuery = { directory: "KYC_DOCUMENTS/FrontDocument" }
    // const backQuery = { directory: "KYC_DOCUMENTS/BackDocument" }
    // const utilityQuery = { directory: "KYC_DOCUMENTS/UtilityDocument" }
    // const kycFrontDocumentRef = $storage.getFiles(frontQuery)
    // const kycBackDocumentRef = $storage.getFiles(backQuery)
    // const kycUtilityDocumentRef = $storage.getFiles(backQuery)
    $db.collection("authUsers").doc().collection("kyc").onSnapshot((querysnapshot) => {
        if(querysnapshot.empty) return "No document found in this collection"
        else {
            kycData = querysnapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })
        }
    })
    return kycData
}