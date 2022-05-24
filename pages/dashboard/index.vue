<template>
  <!-- <Html>
    <Head>
      <Title>Dashboard - Admin</Title>
      <Meta
        name="description"
        content="Fortfolio Admin dashboard landing page"
      />
    </Head>
  </Html> -->
  <NuxtLayout name="dashboard">
    <Activitycards />
    <TablesIncomingInvestmentTable />
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>
