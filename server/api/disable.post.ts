import { auth, db } from "~~/helpers/fireadmin";

export default defineEventHandler(async (event) => {
    const uid: string = await useBody(event)
    let message = "User already disabled"
    const isDisabled: boolean = (await auth.getUser(uid)).disabled
    
    return message
})
