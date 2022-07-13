import { db, auth } from "~~/helpers/fireadmin";

export default defineEventHandler(async (event) => {
    const uid: string = await useBody(event)
    let message = ""
    await db.collection("authUsers").doc(uid).update({
        status: "Enabled"
    }).then(async () => {
        await auth.updateUser(uid, {
            disabled: false,
        })
        message = "Successfully enabled user"
    }).catch((error) => {
        message = "Error enabling user " + error
    })
    return message
})
