import { getAuth } from "firebase-admin/auth";
import { db } from "~~/helpers/fireadmin";

export default defineEventHandler(async (event) => {
    const uid = await useBody(event)
    await getAuth()
            .updateUser(uid, {
                disabled: true,
            })
            .then((_) => {
                db.collection("authUsers").doc(uid).update({
                    status: "Disabled"
                })
                return 'Successfully disabled user'
            })
            .catch((error) => {
                return "Error disabling user " + error
            })
})
