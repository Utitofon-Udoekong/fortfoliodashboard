import { getAuth } from "firebase-admin/auth";

export default async (req) => {
    const {uid} = await useBody(req)
    await getAuth()
            .deleteUser(uid)
            .then(() => {
                return 'Successfully deleted user';
            })
            .catch((error) => {
                return `Error deleting user: ${error}`
            });
}