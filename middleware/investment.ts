import { useUserStore } from "~~/store/users"

export default defineNuxtRouteMiddleware((to, from) => {
    const store = useUserStore()
    if (to.path === "/dashboard/investment") {
      store.setInvestments()
      console.log("yes")
    }else{
        console.log("no", to.path)
    }
  })
  