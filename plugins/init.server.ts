import { defineNuxtPlugin } from '#app'
import { useUserStore } from '~~/store/users'

export default defineNuxtPlugin(async (nuxtApp) => {
  const users = useUserStore(nuxtApp.$pinia)
  console.log("initing user")
  await users.setUsers()
  console.log("inited user")
})