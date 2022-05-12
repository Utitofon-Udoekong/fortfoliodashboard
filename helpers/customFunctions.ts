import { getAuth, UserRecord } from "firebase-admin/auth"
import {auth} from "./fireadmin"

class AdminFunction {
    async register(email:string, password: string){
        await auth.createUser({
            email: email,
            password: password
        }).then((record) => {
            auth.setCustomUserClaims(record.uid, {admin: true})
        }).catch((error) => {
            return console.log("Error encountered registering user", error)
        })
    }
    async login(email:string, password: string){
        await auth.createUser({
            email: email,
            password: password
        }).then((record) => {
            auth.setCustomUserClaims(record.uid, {admin: true})
        }).catch((error) => {
            return console.log("Error encountered registering user", error)
        })
    }
    async getUserByID(uid: string) {
        await getAuth()
            .getUser(uid)
            .then((userRecord: UserRecord) => {
                // See the UserRecord reference doc for the contents of userRecord.
                // return console.log(`Successfully fetched user data: {userRecord.toJSON()}`);
                return userRecord
            })
            .catch((error) => {
                return console.log('Error fetching user data:', error);
            });

    }

    async updateUserPassword(uid: string, newPassword: string) {
        await getAuth()
            .updateUser(uid, {
                password: newPassword,
            })
            .then((_) => {
                // See the UserRecord reference doc for the contents of userRecord.
                return console.log('Successfully updated user password');
            })
            .catch((error) => {
                return console.log('Error updating user:', error);
            });
    }
    async updateUserEmail(uid: string, newEmail: string) {
        await getAuth()
            .updateUser(uid, {
                email: newEmail,
            })
            .then((_) => {
                // See the UserRecord reference doc for the contents of userRecord.
                return console.log('Successfully updated user password');
            })
            .catch((error) => {
                return console.log('Error updating user:', error);
            });
    }
    async updateUserPhone(uid: string, newPhone: string) {
        await getAuth()
            .updateUser(uid, {
                phoneNumber: newPhone,
            })
            .then((_) => {
                // See the UserRecord reference doc for the contents of userRecord.
                return console.log('Successfully updated user password');
            })
            .catch((error) => {
                return console.log('Error updating user:', error);
            });
    }

    async disableUser(uid: string) {
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
            });
    }
    async enableUser(uid: string) {
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

    async deleteUser(uid: string) {
        await getAuth()
            .deleteUser(uid)
            .then(() => {
                return console.log('Successfully deleted user');
            })
            .catch((error) => {
                return console.log('Error deleting user:', error);
            });

    }
}

export default new AdminFunction