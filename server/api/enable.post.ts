import { db, auth } from "~~/helpers/fireadmin";

export default defineEventHandler(async (event) => {
    const uid: string = await useBody(event)
    const isDisabled: boolean = (await auth.getUser(uid)).disabled
    let message = "User already enabled"
    if(isDisabled){
        try{
            await auth.updateUser(uid, {
                disabled: false,
            })
            await db.collection("authUsers").doc(uid).update({
                status: "Enabled"
            })
            message = "Successfully enabled user"
        }catch(e){
            message = "Error enabling user " + e
        }

    }
    return message
})
