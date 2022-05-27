<template>
  <div>
    <Html>
      <Head>
        <Title>Dashboard - Admin</Title>
        <Meta
          name="description"
          content="Fortfolio Admin dashboard landing page"
        />
      </Head>
    </Html>
    <NuxtLayout name="dashboard">
      <Activitycards />
      <TablesIncomingInvestmentTable />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: ["auth"],
});
</script>
