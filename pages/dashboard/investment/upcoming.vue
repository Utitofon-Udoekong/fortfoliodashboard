<template>
  <NuxtLayout name="dashboard">
    <div class="py-4">
      <TablesIncomingInvestmentTable />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>
