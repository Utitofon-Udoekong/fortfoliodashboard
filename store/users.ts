import { Auth, createUserWithEmailAndPassword, signOut } from "@firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
    state: () => ({
        users: [],
        kyc: [],
        investments: [],
        withdrawals: [],
        snackbarMessage: "",
        showSnackBar: false
    }),
    getters: {
        getUsers(state) {
            return state.users
        },
        getKyc(state){
            return state.kyc
        },
        getInvestments(state){
            return state.investments
        },
        getWithdrawals(state){
            return state.withdrawals
        },
        getUserCount(state){
            return state.users.length
        },
        getKycCount(state){
            return state.kyc.length
        },
        getWithdrawalCount(state){
            return state.withdrawals.length
        }
    },
    actions: {
        async setUsers() {
            const { data } = await useAsyncData('users', () => $fetch('/api/users'))
            this.users = data.value
        },
        async setKyc() {
            const { data } = await useAsyncData('kyc', () => $fetch('/api/kyc'))
            this.kyc = data.value
        },
        async setInvestments() {
            const { data } = await useAsyncData('investments', () => $fetch('/api/investments'))
            this.investments = data.value
        },
        async setWithdrawals() {
            const { data } = await useAsyncData('withdrawals', () => $fetch('/api/withdrawals'))
            this.withdrawals = data.value
        },
        async register(auth: Auth,email:string, password: string){
            createUserWithEmailAndPassword(auth,email, password).then(async (admin) => {
                await Promise.all([
                    this.setUsers(),
                    this.setKyc(),
                    this.setInvestments(),
                    this.setWithdrawals(),
                ])
            })
        },
        async login(){
            await Promise.all([
                this.setUsers(),
                this.setKyc(),
                this.setInvestments(),
                this.setWithdrawals(),
            ])
            // signInWithEmailAndPassword(auth,email,password).then(async (_) => {
            // })
        },
        async signOut(auth: Auth){
            signOut(auth)
        }
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
        //         return 'Successfully deleted user';
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