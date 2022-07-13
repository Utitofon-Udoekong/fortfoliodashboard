import { auth, db } from "~~/helpers/fireadmin";

export default defineEventHandler(async (event) => {
    const uid: string = await useBody(event)
    let message = "User already disabled"
    const isDisabled: boolean = (await auth.getUser(uid)).disabled
    if(!isDisabled){
        try{
            await auth.updateUser(uid, {
                disabled: true,
            })
            await db.collection("authUsers").doc(uid).update({
                status: "Disabled"
            })
            message = "Successfully disabled user"
        }catch(e){
            message = "Error disabling user " + e
        }

    }
    return message
})
