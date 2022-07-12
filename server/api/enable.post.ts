import { db, auth } from "~~/helpers/fireadmin";

export default defineEventHandler(async (event) => {
    const uid = await useBody(event)
    await auth
    .updateUser(uid, {
        disabled: false,
    })
    .then((_) => {
        db.collection("authUsers").doc(`${uid}`).update({
            status: "Enabled"
        })
        return 'Successfully enabled user'
    })
    .catch((error) => {
        return "Error enabling userz: " + error
    });
})
