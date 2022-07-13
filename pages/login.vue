<script setup lang="ts">
import { useUserStore } from "~~/store/userStore";
import AuthFirebase from "../components/AuthFirebase.vue";
const router = useRouter();
const firebaseUser = useFirebaseUser()
const {setLoading, setshowSuccess, setshowFailure, setNotificationMessage} = useUserStore()
const loadingEvent = (e: boolean) => (setLoading(e));
const signin = async () => {
  await signInUser(signinForm.value.email, signinForm.value.password)
    .then(async (_) => {
      setshowSuccess(true)
      setNotificationMessage("Login successful")
    })
    .catch((error) => {
      setNotificationMessage(error)
      setshowFailure(true)
    });
  signinForm.value = { email: "", password: "" };
};

const signinForm = ref({ email: "", password: "" });
watch(firebaseUser, (newVal) => {
  setLoading(true)
  if (newVal) {
    setLoading(false)
    router.push("/dashboard")
  }
});

</script>

<template>
  <div>
    <Notifications />
    <Loader />
    <div class="h-screen">
      <Html>
        <Head>
          <Title>Login - Admin</Title>
          <Meta name="description" content="Fortfolio Admin Signup page" />
        </Head>
      </Html>
      <div class="flex justify-center items-center h-full">
        <div class="w-80 flex flex-col border border-gray-600">
          <p class="text-center text-black pb-3" v-if="firebaseUser">logging in</p>
          <AuthFirebase title="Sign in" @submit="signin" :form="signinForm" @loading="loadingEvent" />
        </div>
      </div>
    </div>
  </div>
</template>
