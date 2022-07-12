import { getAuth } from "firebase-admin/auth";
import { db } from "~~/helpers/fireadmin";

export default async (req) => {
    const {uid} = await useBody(req)
    await getAuth()
    .updateUser(uid, {
        disabled: false,
    })
    .then((_) => {
        db.collection("authUsers").doc(uid).update({
            status: "Enabled"
        })
        return 'Successfully enabled user'
    })
    .catch((error) => {
        return "Error enabling userz: " + error
    });
}