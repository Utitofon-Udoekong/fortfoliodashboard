<template>
  <div>
    <Html>
    <Head>
      <Title>Dashboard - Investments</Title>
      <Meta
        name="description"
        content="Fortfolio Admin dashboard investment page"
      />
    </Head>
  </Html>
  <NuxtLayout name="dashboard">
    <div class="py-4">
      <TablesInvestmentTable />
    </div>
  </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: ["auth"]
});
</script>
