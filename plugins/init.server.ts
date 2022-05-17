import { defineNuxtPlugin } from '#app'
import { useUserStore } from '~~/store/users'

export default defineNuxtPlugin(async (nuxtApp) => {
  const users = useUserStore(nuxtApp.$pinia)
  console.log("initing user and kyc")
  // await users.setuser()
  // await users.setkyc()
  console.log("inited user and kyc")
})