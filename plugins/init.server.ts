import { defineNuxtPlugin } from '#app'
import { useUserStore } from '~~/store/users'

export default defineNuxtPlugin(async (nuxtApp) => {
  const users = useUserStore(nuxtApp.$pinia)
  console.log("initing user and kyc")
  // await users.setUsers()
  await Promise.all([users.setInvestments()])
  // await Promise.all([
  //   await users.setUsers(),
  //   await users.setKyc(),
  //   await users.setInvestments(),
  //   await users.setWithdrawals(),
  // ])
  console.log("inited user and kyc")
})