<script setup lang="ts">
import { useUserStore } from "~~/store/users";
const router = useRouter();
const store = useUserStore();

const registerForm = ref({ email: "", password: "" });
const registerMessage = ref();
const register = async () => {
  console.log(registerForm.value);
  const credentials = await createUser(
    registerForm.value.email,
    registerForm.value.password
  );
  registerForm.value = { email: "", password: "" };
  if (credentials) {
    registerMessage.value = `Successfully registered: ${credentials.user.email}`;
    setTimeout(() => {
      registerMessage.value = "";
    }, 3000);
    await store.login().then(() => {
      router.push("/dashboard");
    });
  }
};
</script>

<template>
  <div class="h-screen">
    <Html>
      <Head>
        <Title>Register - Admin</Title>
        <Meta name="description" content="Fortfolio Admin Signup page" />
      </Head>
    </Html>
      <div class="flex justify-center items-center h-full">
        <div class="w-80 flex flex-col border">
          <AuthFirebase
            title="Register"
            @submit="register"
            :form="registerForm"
            :message="registerMessage"
          />
          <NuxtLink to="/login" class="text-brand-light-blue"
            >Login ?</NuxtLink
          >
        </div>
      </div>
  </div>
</template>
