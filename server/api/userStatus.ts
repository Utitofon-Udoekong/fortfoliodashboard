import { getAuth } from "firebase-admin/auth";

export default async (req) => {
    if(req.method !== 'POST') return 'Invalid request'
    const {uid} = await useBody(req)
    return (await getAuth().getUser(uid)).disabled
}