import { db, auth } from "~~/helpers/fireadmin";

export default defineEventHandler(async (event) => {
    const uid = await useBody(event)
    await auth
            .deleteUser(`${uid}`)
            .then(async () => {
                await db.collection("authUsers").doc(`${uid}`).delete().then(() => 'Successfully deleted user')
            })
            .catch((error) => {
                return `Error deleting user: ${error}`
            });
})
