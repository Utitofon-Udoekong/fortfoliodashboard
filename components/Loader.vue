<script lang="ts" setup>
interface Props {
    loading: false
}
const props = defineProps<Props>()
</script>
<template>
<div v-if="props.loading" class="loader flex justify-center items-center fixed h-screen w-screen z-50 inset-0 bg-gray-800/25">
    <div class="spinner w-20 h-20 rounded-full border-4 border-t-white animate-spin"></div>
</div>
</template>
<style>
</style>