import { auth, db } from "~~/helpers/fireadmin";

export default defineEventHandler(async (event) => {
    const uid: string = await useBody(event)
    let message = ""
    await db.collection("authUsers").doc(uid).update({
        status: "Disabled"
    }).then(async () => {
        await auth.updateUser(uid, {
            disabled: true,
        })
        message = "Successfully disabled user"
    }).catch((error) => {
        message = "Error disabling user " + error
    })
    return message
    // await auth.updateUser(uid, {
    //             disabled: true,
    //         })
    //         .then(async (_) => {
                // await db.collection("authUsers").doc(uid).update({
                //     status: "Disabled"
                // })
                // return 'Successfully disabled user'
    //         })
            // .catch((error) => {
            //     return "Error disabling user " + error
            // })
})
