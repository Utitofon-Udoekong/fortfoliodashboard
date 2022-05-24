<template>
  <Sidebar/>
</template>

<script setup lang="ts">
let clamp = ref(false);
const changeClamp = () => clamp.value = !clamp.value;
provide("clamp", {
    clamp,
    changeClamp
})
// import { useUserStore } from "~~/store/userStore";

// const store = useUserStore();
// const router = useRouter();
// const firebaseUser = useFirebaseUser();
// onMounted(async () => {
//   router.push("/login");
  
// });
</script>
