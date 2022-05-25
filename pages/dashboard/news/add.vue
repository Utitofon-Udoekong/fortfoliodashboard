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
    <!-- <DropZone
      class="drop-area"
      @files-dropped="addFiles"
      #default="{ dropZoneActive }"
    >
      <div v-if="dropZoneActive">
        <div>Drop Them</div>
      </div>
      <div v-else>
        <div>Drag Your Files Here</div>
      </div>
    </DropZone> -->
    <!-- <div class="files">
      <div class="file" v-for="(file, index) in files" :key="index">
        {{ file.file }}
        <p>Upload progress</p>
        <progress :value="progress" max="100"></progress>
        <div class="flex">
            <button class="p-3 mr-3 bg-brand-blue text-white" @click="uploadFile(file)">upload</button>
            <button class="p-3 mr-3 bg-brand-blue text-white" @click="pauseUpload">pause</button>
            <button class="p-3 mr-3 bg-brand-blue text-white" @click="resumeUpload">resume</button>
            <button class="p-3 mr-3 bg-brand-blue text-white" @click="cancelUpload">cancel</button>
        </div>
      </div>
    </div> -->
  </NuxtLayout>
</template>
<style></style>
