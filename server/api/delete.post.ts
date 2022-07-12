import { getAuth } from "firebase-admin/auth";
import { db } from "~~/helpers/fireadmin";

export default defineEventHandler(async (event) => {
    const uid = await useBody(event)
    await getAuth()
            .deleteUser(uid)
            .then(async () => {
                await db.collection("authUsers").doc(uid).delete().then(() => 'Successfully deleted user')
            })
            .catch((error) => {
                return `Error deleting user: ${error}`
            });
})
