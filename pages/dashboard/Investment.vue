<template>
  <NuxtLayout name="dashboard">
    <div class="py-4">
      <TablesInvestmentTable />
    </div>
    <div class="py-4">
      <div class="flex gap-4">
        <InvestmentOverview />
        <TopInvestments />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
// import InvestmentOverview from '~~/components/InvestmentOverview.vue';
definePageMeta({
  layout: false,
});
</script>
