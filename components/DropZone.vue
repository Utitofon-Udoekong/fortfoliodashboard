<script setup>
const { $storage } = useNuxtApp();
const emits = defineEmits(["fileChange", "loading"]);

const onFileChange = async (e) => {
  emits("loading", true);
  var files = e.target.files || e.dataTransfer.files;
  if (!files.length) return;
  const { downloadUrl } = await uploadFile(files[0], $storage);
  emits("loading", false);
  emits("fileChange", downloadUrl);
};
</script>
<template>
  <div class="mx-auto w-full">
    <div class="mb-4 flex justify-center">
      <div class="flex justify-center items-center w-full">
        <label
          for="dropzone-file"
          class="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div class="flex flex-col justify-center items-center pt-5 pb-6">
            <i-ic-round-upload class="mb-3 w-10 h-10 text-gray-400" />
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span class="font-semibold">Click to upload</span>
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            class="hidden"
            @change.prevent="onFileChange"
            accept="image/*"
          />
        </label>
      </div>
    </div>
  </div>
</template>
<style></style>
