<script setup >
import { ref, watchEffect } from 'vue'

const props = defineProps({
  path: String,
  alt: String,
})

const image = ref()

watchEffect(async () => {
  image.value = (await import(/* @vite-ignore */ `../assets/images/${props.path}.png`)).default
})
</script>

<template>
  <img :src="image" :alt="alt" />
</template>