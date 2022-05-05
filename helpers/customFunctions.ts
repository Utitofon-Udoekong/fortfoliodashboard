import { getAuth } from "firebase-admin/auth"

class AdminFunction {
    async getUserAuthInfo(uid: string) {
        await getAuth()
            .getUser(uid)
            .then((userRecord) => {
                // See the UserRecord reference doc for the contents of userRecord.
                return console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
            })
            .catch((error) => {
                return console.log('Error fetching user data:', error);
            });

    }

    async updateUserAuthInfo (uid: string){
        getAuth()
  .updateUser(uid, {
    email: 'modifiedUser@example.com',
    phoneNumber: '+11234567890',
    emailVerified: true,
    password: 'newPassword',
    displayName: 'Jane Doe',
    disabled: true,
  })
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log('Successfully updated user', userRecord.toJSON());
  })
  .catch((error) => {
    console.log('Error updating user:', error);
  });
    }

    async getDisabledStatus (uid: string) {
        
    }
}