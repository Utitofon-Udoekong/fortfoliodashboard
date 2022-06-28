import { getAuth } from "firebase-admin/auth";

export default async (req) => {
    const {uid} = await useBody(req)
    await getAuth()
    .updateUser(uid, {
        disabled: false,
    })
    .then((_) => {
        // See the UserRecord reference doc for the contents of userRecord.
        return 'Successfully deleted user'
    })
    .catch((error) => {
        return "Error deleting user " + error
    });
}