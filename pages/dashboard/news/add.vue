<script lang="ts" setup>
import { getDownloadURL } from "firebase/storage";

definePageMeta({
  layout: false,
});
const { files, addFiles, removeFile } = useFileLists();
const progress = ref(0)
const showError = ref(false);
const showSuccess = ref(false);
const notificationMessage = ref("");
const pauseUpload = ref(null)
const cancelUpload = ref(null)
const resumeUpload = ref(null)

const uploadFile = (file) => {
  const metadata = {
    contentType: file.type,
  };

  const uploadTask = uploadImage(file, metadata);
  pauseUpload.value = uploadTask.pause()
  cancelUpload.value = uploadTask.cancel()
  resumeUpload.value = uploadTask.resume()
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      progress.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress.value + "% done");
      switch (snapshot.state) {
        case "paused":
          notificationMessage.value = "Upload paused";
        showError.value = true
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      notificationMessage.value = error.message;
      showError.value = true
    },
    () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          showSuccess.value = true
          notificationMessage.value = `File uploaded successfully`
      });
    }
  );
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
    <!-- <DropZone/> -->
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
