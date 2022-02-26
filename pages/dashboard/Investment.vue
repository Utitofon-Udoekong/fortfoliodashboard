<template>
 
  <NuxtLayout name="dashboard">
    <div class="flex gap-4">
      <InvestmentOverview/>
      <TopInvestments/>
    </div>
    <div>
      <LineChart/>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import InvestmentOverview from '~~/components/InvestmentOverview.vue';
definePageMeta({
  layout: false,
});
</script>
