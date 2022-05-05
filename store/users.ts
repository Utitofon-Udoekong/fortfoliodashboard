// import { getAuth } from "firebase-admin/auth";
import { defineStore } from "pinia";
// import AdminFunctions from "~~/helpers/customFunctions"

export const useUser = defineStore('user', {
    state: () => ({
        users: [],
        snackbarMessage: "",
        showSnackBar: false
    }),
    getters: {
        getUsers(state) {
            return state.users
        }
    },
    actions: {
        async setuser() {
            const { data } = await useAsyncData('users', () => $fetch('/api/users'))
            this.users = data.value
        },
        // async disableUser(uid: string){
        //     const message = await getAuth()
        //     .updateUser(uid, {
        //         disabled: true,
        //     })
        //     .then((_) => {
        //         // See the UserRecord reference doc for the contents of userRecord.
        //         return 'Successfully disabled user'
        //     })
        //     .catch((error) => {
        //         return "Error disabling user " + error
        //     });
        //     this.showSnackbar(message)
        // },
        // async enableUser(uid: string){
        //     const message = await getAuth()
        //     .updateUser(uid, {
        //         disabled: false,
        //     })
        //     .then((_) => {
        //         // See the UserRecord reference doc for the contents of userRecord.
        //         return 'Successfully deleted user'
        //     })
        //     .catch((error) => {
        //         return "Error deleting user " + error
        //     });
        //     this.showSnackbar(message)
        // },
        // async deleteUser(uid: string){
        //     const message = await getAuth()
        //     .deleteUser(uid)
        //     .then(() => {
        //         return console.log('Successfully deleted user');
        //     })
        //     .catch((error) => {
        //         return console.log('Error deleting user:', error);
        //     });
        //     this.showSnackbar(message)
        // },
        // showSnackbar(message: string){
        //     this.snackbarMessage = message
        // },
        // closeSnackbar(){
        //     this.snackbarMessage = ""
        // }
    }
})