import { IncomingMessage, ServerResponse } from "http";
// import { ref } from "@firebase/storage";

export default (req: IncomingMessage, res: ServerResponse) => {
    let kycData: any[]
    const {$storage} = useNuxtApp()
    // const kycRef = ref(storage,"KYC_DOCUMENTS/uid")
    const frontQuery = { directory: "KYC_DOCUMENTS/FrontDocument" }
    const backQuery = { directory: "KYC_DOCUMENTS/BackDocument" }
    const utilityQuery = { directory: "KYC_DOCUMENTS/UtilityDocument" }
    const kycFrontDocumentRef = $storage.getFiles(frontQuery)
    const kycBackDocumentRef = $storage.getFiles(backQuery)
    const kycUtilityDocumentRef = $storage.getFiles(backQuery)
}