import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
    state: () => ({
        users: [],
        kyc: [],
        investments: [],
        withdrawals: [],
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
            if(data.value.length >= 0){
                this.users = data.value
            }
        },
        async setKyc() {
            const { data } = await useAsyncData('kyc', () => $fetch('/api/kyc'))
            if(data.value.length >= 0){
                this.kyc = data.value
            }
        },
        async setInvestments() {
            const { data } = await useAsyncData('investments', () => $fetch('/api/investments'))
            if(data.value.length >= 0){
                this.investments = data.value
            }
        },
        async setWithdrawals() {
            const { data } = await useAsyncData('withdrawals', () => $fetch('/api/withdrawals'))
            if(data.value.length >= 0){
                this.withdrawals = data.value
            }
        },
        async login(){
            await Promise.all([
                this.setUsers(),
                this.setKyc(),
                this.setInvestments(),
                this.setWithdrawals(),
            ])
     
        },
        
        async disableUser(uid: string){
            const {data} = await useAsyncData('disableUser', () => $fetch('/api/disable', {
                method: "POST",
                body: {uid}
            }))
            const message = data.value
            console.log(message)
        },
        async enableUser(uid: string){
            const {data} = await useAsyncData('enableUser', () => $fetch('/api/enable', {
                method: "POST",
                body: {uid}
            }))
            const message = data.value
            console.log(message)
        },
        async deleteUser(uid: string){
            const {data} = await useAsyncData('deleteUser', () => $fetch('/api/delete', {
                method: "POST",
                body: {uid}
            }))
            const message = data.value
            console.log(message)
        },
        async getStatus(uid: string){
            const {data} = await useAsyncData('getStatus', () => $fetch('/api/userStatus', {
                method: "POST",
                body: {uid}
            }))
            const message = data.value
            console.log(message)
        },

        // showSnackbar(message: string){
        //     this.snackbarMessage = message
        // },
        // closeSnackbar(){
        //     this.snackbarMessage = ""
        // }
    }
})