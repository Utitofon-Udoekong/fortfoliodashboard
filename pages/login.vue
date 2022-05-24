<script setup lang="ts">
import { useUserStore } from "~~/store/users";
const store = useUserStore();
const router = useRouter();
const { $auth } = useNuxtApp();

interface Login {
  email: string;
  password: string;
  confirmed: string;
}
let email = ref("");
let password = ref("");

const login = async () => {
  await store.login().then(() => {
    router.push("/dashboard");
  });
};
</script>

<template>
  <div class="h-screen">
    <Html>
      <Head>
        <Title>Login - Admin</Title>
        <Meta name="description" content="Fortfolio Admin Signup page" />
      </Head>
    </Html>
    <div class="flex justify-center items-center h-full">
      <div class="w-80 flex flex-col border">
        <div class="header w-full bg-brand-blue mb-3 grid place-items-center">
          <h2 class="text-xl p-2 mb-6 text-white">Login Admin</h2>
        </div>
        <div class="p-10">
          <div class="formgroup mb-6 flex flex-col">
            <label for="email">Email</label>
            <input
              type="email"
              class="p-2"
              id="email"
              required
              v-model="email"
            />
          </div>
          <div class="formgroup mb-6 flex flex-col">
            <label for="password">Password</label>
            <input
              type="text"
              id="password"
              class="p-2"
              required
              v-model="password"
            />
          </div>
          <button
            @click="login"
            class="hover:underline-current text-white p-4 text-center text-md w-full bg-brand-blue"
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
