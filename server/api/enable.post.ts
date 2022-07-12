import { getAuth } from "firebase-admin/auth";
import { db } from "~~/helpers/fireadmin";

export default defineEventHandler(async (event) => {
    const uid = await useBody(event)
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
})
