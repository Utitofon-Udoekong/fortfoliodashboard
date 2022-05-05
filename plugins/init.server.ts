import { defineNuxtPlugin } from '#app'
import { useUser } from '~~/store/users'

export default defineNuxtPlugin(async (nuxtApp) => {
  const users = useUser(nuxtApp.$pinia)
  await users.setuser()
  console.log("initing user")
  console.log(users.getUsers)
})