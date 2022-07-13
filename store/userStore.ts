import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
    actions: {        
        async disableUser(uid: string){
            console.log(uid.toString())
            // const {data} = await useAsyncData('disable', () => $fetch('/api/disable', {
            //     method: "POST",
            //     body: {uid}
            // }))
            // const message = data.value
            // console.log("store",message)
        },
        async enableUser(uid: string){
            const {data} = await useAsyncData('enable', () => $fetch('/api/enable', {
                method: "POST",
                body: {uid}
            }))
            const message = data.value
            console.log(message)
        },
        async deleteUser(uid: string){
            const {data} = await useAsyncData('delete', () => $fetch('/api/delete', {
                method: "POST",
                body: {uid}
            }))
            const message = data.value
            console.log(message)
        }
    }
})