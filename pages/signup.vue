<script setup lang="ts">
import { useUserStore } from "~~/store/userStore";
const router = useRouter();
const store = useUserStore();
const showError = ref(false);
const showSuccess = ref(false);
const notificationMessage = ref("");

const registerForm = ref({ email: "", password: "" });
const register = async () => {
  console.log(registerForm.value);
  await createUser(
    registerForm.value.email,
    registerForm.value.password
  ).then(async (credentials) => {
    if (credentials) {
      showSuccess.value = true
      notificationMessage.value = "Registration successful"
    }
  }).catch((error) => {
    notificationMessage.value = error.message;
      showError.value = true
  })
  registerForm.value = { email: "", password: "" };
};
watch(showError, (newVal) => {
  if (newVal === true) {
    setTimeout(() => {
      showError.value = false;
    }, 1500);
  }
});

watch(showSuccess, (newVal) => {
  if (newVal === true) {
    setTimeout(() => {
      showSuccess.value = false;
    }, 1500);
  }
});
onMounted(() => {
  const userCount = store.getUserCount
  if(userCount > 0){
    router.replace("/dashboard")
  }
})
</script>

<template>
  <Notifications :showError="showError" :showSuccess="showSuccess" :message="notificationMessage"/>
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
          />
          <NuxtLink to="/login" class="text-brand-light-blue p-8"
            >Login ?</NuxtLink
          >
        </div>
      </div>
  </div>
</template>
