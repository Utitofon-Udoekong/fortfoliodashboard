import { defineStore } from "pinia";

export const useUserStore = defineStore('user', () => {
    const loading = ref(false)
    const notificationMessage = ref("")
    const showSuccess = ref(false)
    const showFailure = ref(false)
    const setLoading = (val: boolean) => loading.value = val
    const setshowFailure = (val: boolean) => showFailure.value = val
    const setshowSuccess = (val: boolean) => showSuccess.value = val
    const setNotificationMessage = (val: string) => notificationMessage.value = val

    const enableUser = async (uid: string) => {
        loading.value = true
        const {data} = await useAsyncData('enable', () => $fetch('/api/enable', {
            method: "POST",
            body: uid
        }))
        const message: string = data.value
        console.log(message)
        notificationMessage.value = message
        loading.value = false
        if(message.includes("Success")) showSuccess.value = true
        else showFailure.value = true
    }
    const disableUser = async (uid: string) => {
        loading.value = true
        const {data} = await useAsyncData('disable', () => $fetch('/api/disable', {
            method: "POST",
            body: uid
        }))
        const message: string = data.value
        console.log(message)
        notificationMessage.value = message
        loading.value = false
        if(message.includes("Success")) showSuccess.value = true
        else showFailure.value = true
    }
    const deleteUser = async (uid: string) => {
        loading.value = true
        const {data} = await useAsyncData('delete', () => $fetch('/api/delete', {
            method: "POST",
            body: uid
        }))
        const message: string = data.value
        console.log(message)
        notificationMessage.value = message
        loading.value = false
        if(message.includes("Success")) showSuccess.value = true
        else showFailure.value = true
    }

    watch(showFailure, (newVal) => {
        if (newVal === true) {
          setTimeout(() => {
            showFailure.value = false;
          }, 1500);
        }
      });
      
      watch(showSuccess, (newVal) => {
        if (newVal === true) {
          setTimeout(() => {
            showSuccess.value = false;
          }, 1500);
        }
      });

      return {
        loading,
        notificationMessage,
        showSuccess,
        showFailure,
        setLoading,
        setshowFailure,
        setshowSuccess,
        setNotificationMessage,
        enableUser,
        disableUser,
        deleteUser
      }
})
