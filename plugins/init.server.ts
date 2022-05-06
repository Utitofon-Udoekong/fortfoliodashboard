import { defineNuxtPlugin } from '#app'
import { useUser } from '~~/store/users'

export default defineNuxtPlugin(async (nuxtApp) => {
  const users = useUser(nuxtApp.$pinia)
  console.log("initing user")
  await users.setuser()
  console.log("inited user")
})