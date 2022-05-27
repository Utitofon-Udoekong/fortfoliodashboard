<script lang="ts" setup>
import { getDownloadURL } from "firebase/storage";

definePageMeta({
  layout: false,
  middleware: ["auth"]
});
const showError = ref(false);
const showSuccess = ref(false);
const notificationMessage = ref("");
const fileChange = (value) => {
  console.log(value)
}

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
</script>
<template>
<Notifications :showError="showError" :showSuccess="showSuccess" :message="notificationMessage"/>
  <div>
    <Html>
    <Head>
      <Title>Dashboard - Add News</Title>
      <Meta
        name="description"
        content="Fortfolio Admin dashboard news Add page"
      />
    </Head>
  </Html>
  <NuxtLayout name="dashboard">
    <DropZone @fileChange="fileChange"/>
  </NuxtLayout>
  </div>
</template>
<style></style>
