<template>
  <NuxtLayout name="dashboard">
    <Activitycards />
    <TablesIncomingInvestmentTable/>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>
