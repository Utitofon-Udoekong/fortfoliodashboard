import { getAuth } from "firebase-admin/auth";

export default async (req) => {
    if(req.method !== 'POST') return 'Invalid request'
    const {uid} = await useBody(req)
    await getAuth()
    .updateUser(uid, {
        disabled: false,
    })
    .then((_) => {
        return 'Successfully enabled user'
    })
    .catch((error) => {
        return "Error enabling userz: " + error
    });
}