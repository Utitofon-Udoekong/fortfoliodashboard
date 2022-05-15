import { useUserStore } from "~~/store/users"

export default defineNuxtRouteMiddleware((to, from) => {
    const store = useUserStore()
    if (to.path === "/dashboard/kyc") {
      store.setkyc()
    }
  })
  