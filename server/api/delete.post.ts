import { db, auth } from "~~/helpers/fireadmin";

export default defineEventHandler(async (event) => {
    const uid: string = await useBody(event)
    let message = ""
    await db.collection("authUsers").doc(uid).delete().then(async () => {
        await auth.deleteUser(uid)
        message = "Successfully deleted user"
    }).catch((error) => {
        message = "Error deleting user " + error
    })
    return message
})
