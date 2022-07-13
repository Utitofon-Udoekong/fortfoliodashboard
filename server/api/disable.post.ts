import { auth, db } from "~~/helpers/fireadmin";

export default defineEventHandler(async (event) => {
    const uid = await useBody(event)
    await db.collection("authUsers").doc(`${uid}`).update({
        status: "Disabled"
    })
    return 'Successfully disabled user'
    // await auth.updateUser(uid, {
    //             disabled: true,
    //         })
    //         .then(async (_) => {
                // await db.collection("authUsers").doc(uid).update({
                //     status: "Disabled"
                // })
                // return 'Successfully disabled user'
    //         })
    //         .catch((error) => {
    //             return "Error disabling user " + error
    //         })
})
