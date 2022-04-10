<template>
  <NuxtLayout name="dashboard">
    <div class="py-4">
      <TablesUpcomingInvestmentTable />
    </div>
    <!-- <div class="py-4">
      <div class="flex gap-4">
        <InvestmentOverview />
        <TopInvestments />
      </div>
    </div> -->
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>
