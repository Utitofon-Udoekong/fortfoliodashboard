import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { db } from "~~/helpers/fireadmin";

export default async (req) => {
    if(req.method !== 'POST') return 'Invalid request'
    const {uid} = await useBody(req)
    await getAuth()
            .deleteUser(uid)
            .then(() => {
                db.collection("authUsers").doc(uid).update({
                    status: "Deleted"
                })
                return 'Successfully deleted user';
            })
            .catch((error) => {
                return `Error deleting user: ${error}`
            });
}