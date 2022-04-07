import { onAuthStateChanged } from 'firebase/auth'
import { useState } from 'nuxt3'
import { onMounted, ref } from 'vue'

const getUserData = () => {
    const user = ref(null)
    
    const auth: any = useState('auth').value
    onMounted(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                user.value = currentUser
            }
        })
    })
    return user
}

export const useGetUserData = () => {
    return getUserData
}