<script lang="ts" setup>
import { useUserStore } from '~~/store/userStore';

const {showFailure, showSuccess, notificationMessage} = useUserStore()


</script>
<template>
  <div
    class="notifications fixed w-1/3 right-3 top-5 z-50 shadow-xl p-6 rounded-md bg-green-700"
    v-if="showSuccess"
  >
    <span class="absolute top-2 right-2"><i-material-symbols-cancel /></span>
    <p class="text-lg text-white font-semibold">{{ notificationMessage }}</p>
  </div>
  <div
    class="notifications fixed w-1/3 right-3 top-5 z-50 shadow-xl p-6 rounded-md bg-red-600 "
    v-if="showFailure"
  >
  <span class="absolute top-2 right-2"><i-material-symbols-cancel /></span>
    <p class="text-lg text-white font-semibold">{{ notificationMessage }}</p>
  </div>
</template>
<style></style>
