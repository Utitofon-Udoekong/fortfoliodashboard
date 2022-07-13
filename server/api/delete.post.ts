import { db, auth } from "~~/helpers/fireadmin";

export default defineEventHandler(async (event) => {
    const uid: string = await useBody(event)
    let message = ""
    try {
        await auth.deleteUser(uid)
        await db.collection("authUsers").doc(uid).delete()
        message = "Successfully deleted user"
    } catch (e) {
        message = "Error deleting user " + e
    }

    return message
})
