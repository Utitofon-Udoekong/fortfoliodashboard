<script setup lang="ts">
import { signInWithEmailAndPassword } from "@firebase/auth";
import { useUserStore } from "~~/store/users";
// import { signOutUser } from "../composables/useFirebase";
import AuthFirebase from "../components/AuthFirebase.vue";
const store = useUserStore();
const router = useRouter();
const signin = () => {
  console.log(signinForm.value);
  signInUser(signinForm.value.email, signinForm.value.password).then(
    async (_) => {
      await store.login().then(() => {
        router.push("/dashboard");
      });
    }
  );
  signinForm.value = { email: "", password: "" };
};
const signinForm = ref({ email: "", password: "" });
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
        
        <AuthFirebase title="Sign in" @submit="signin" :form="signinForm" />
        <NuxtLink to="/signup" class="text-brand-light-blue">Signup ?</NuxtLink>
      </div>
    </div>
  </div>
</template>
