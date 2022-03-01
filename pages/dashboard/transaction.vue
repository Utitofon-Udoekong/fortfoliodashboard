<template>
 
  <NuxtLayout name="dashboard">
    <TransactionsTable/>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>
