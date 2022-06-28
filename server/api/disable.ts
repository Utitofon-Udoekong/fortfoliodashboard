import { getAuth } from "firebase-admin/auth";

export default async (req) => {
    if(req.method !== 'POST') return 'Invalid request'
    const {uid} = await useBody(req)
    await getAuth()
            .updateUser(uid, {
                disabled: true,
            })
            .then((_) => {
                // See the UserRecord reference doc for the contents of userRecord.
                return 'Successfully disabled user'
            })
            .catch((error) => {
                return "Error disabling user " + error
            })}