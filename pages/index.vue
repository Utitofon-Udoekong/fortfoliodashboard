<template>
  <div class=""></div>
</template>

<script setup lang="ts">
import { useUserStore } from "~~/store/users";

const store = useUserStore();
const router = useRouter();
const firebaseUser = useFirebaseUser();
onMounted(async () => {
  if (firebaseUser) {
    await store.login().then(() => {
      router.push("/dashboard");
    });
  } else {
    router.push("/login");
  }
});
</script>
