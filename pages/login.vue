<script setup lang="ts">
import { useUserStore } from "~~/store/users";
const store = useUserStore()
const router = useRouter()
const {$auth} = useNuxtApp()

interface Login {
    email: string,
    password: string,
    confirmed: string
}
let email = ref("")
let password = ref("")

const login = async () => {
  await store.login().then(() => {
    router.push("/dashboard")
  })
}

</script>

<template>
  <div class="h-screen">
    <Html>
      <Head>
        <Title>Login - Admin</Title>
        <Meta name="description" content="Fortfolio Admin Signup page"/>
      </Head>
    </Html>
    <div class="flex justify-center items-center h-full">
      <div
        class="max-w-sm flex flex-col"
      >
        <div class="header w-full p-8 bg-brand-blue">
          <h2 class="title p-2 text-center mb-6 text-white ">
          Login Admin
        </h2>
        </div>
       <div class="body p-8">
          <label for="email">Email</label>
        <input type="email" class="p-2" id="email" required v-model="email">
        <label for="password">Password</label>
        <input type="text" id="password" class="p-2" required v-model="password">
        <button @click="login"
              class="hover:underline-current text-brand-light-blue text-sm"
              >Signup</button
            >
       </div>
      </div>
    </div>
  </div>
</template>

