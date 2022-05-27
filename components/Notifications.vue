<script lang="ts" setup>
interface Props {
  showError: boolean;
  showSuccess: boolean;
  message: string;
}
const props = defineProps<Props>();

</script>
<template>
  <div
    class="notifications fixed w-1/3 right-3 top-5 z-50 shadow-xl p-6 rounded-md bg-green-700"
    v-if="props.showSuccess"
  >
    <p class="text-lg text-white font-semibold">{{ props.message }}</p>
  </div>
  <div
    class="notifications fixed w-1/3 right-3 top-5 z-50 shadow-xl p-6 rounded-md bg-red-600"
    v-if="props.showError"
  >
    <p class="text-lg text-white font-semibold">{{ props.message }}</p>
  </div>
</template>
<style></style>
