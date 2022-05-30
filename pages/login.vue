<script setup lang="ts">
import AuthFirebase from "../components/AuthFirebase.vue";
const router = useRouter();
const firebaseUser = useFirebaseUser()
const showError = ref(false);
const showSuccess = ref(false);
const notificationMessage = ref("");
const loading = ref(false);
const loadingEvent = (e) => (loading.value = e);
const signin = async () => {
  await signInUser(signinForm.value.email, signinForm.value.password)
    .then(async (_) => {
      showSuccess.value = true;
      notificationMessage.value = "Login successful";
    })
    .catch((error) => {
      notificationMessage.value = error;
      showError.value = true;
    });
  signinForm.value = { email: "", password: "" };
};

const signinForm = ref({ email: "", password: "" });

watch(showError, (newVal) => {
  if (newVal === true) {
    loading.value = false
    setTimeout(() => {
      showError.value = false;
    }, 1500);
  }
});

watch(showSuccess, (newVal) => {
  loading.value = false
  if (newVal === true) {
    setTimeout(() => {
      showSuccess.value = false;
    }, 1500);
  }
});
watch(firebaseUser, (newVal) => {
  if (newVal) {
    loading.value = false
    router.push("/dashboard")
  }
});
watchEffect(() => {
  if(firebaseUser === null){
    loading.value = true
  }else{
    loading.value = false
  }
})

</script>

<template>
  <div>
    <Notifications
      :showError="showError"
      :showSuccess="showSuccess"
      :message="notificationMessage"
    />
    <Loader :loading="loading" />
    <div class="h-screen">
      <Html>
        <Head>
          <Title>Login - Admin</Title>
          <Meta name="description" content="Fortfolio Admin Signup page" />
        </Head>
      </Html>
      <div class="flex justify-center items-center h-full">
        <div class="w-80 flex flex-col border border-gray-600">
          <AuthFirebase title="Sign in" @submit="signin" :form="signinForm" @loading="loadingEvent" />
        </div>
      </div>
    </div>
  </div>
</template>
