import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
    // state: () => ({
    //     loading: false,
    //     notificationMessage: "",
    //     showSuccess: false,
    //     showFailure: false,
    // }),
    // actions: {  
    //     async disableUser(uid: string){
    //         const {data} = await useAsyncData('disable', () => $fetch('/api/disable', {
    //             method: "POST",
    //             body: uid
    //         }))
    //         const message = data.value
    //         console.log(message)
    //         this.notificationMessage = message
    //     },
    //     async enableUser(uid: string){
    //         const {data} = await useAsyncData('enable', () => $fetch('/api/enable', {
    //             method: "POST",
    //             body: uid
    //         }))
    //         const message = data.value
    //         console.log(message)
    //         return message
    //     },
    //     async deleteUser(uid: string){
    //         const {data} = await useAsyncData('delete', () => $fetch('/api/delete', {
    //             method: "POST",
    //             body: uid
    //         }))
    //         const message = data.value
    //         console.log(message)
    //         return message
    //     }
    // }
})