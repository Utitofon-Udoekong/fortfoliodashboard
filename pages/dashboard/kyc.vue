<template>
 
  <NuxtLayout name="dashboard">
    <TablesKYCTable/>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});
const route = useRoute()
onMounted(() => {
  console.log(route.path)
})
</script>
