<template>
  <div>
    <Html>
      <Head>
        <Title>Dashboard - Upcoming Investments</Title>
        <Meta
          name="description"
          content="Fortfolio Admin dashboard upcoming investment page"
        />
      </Head>
    </Html>
    <NuxtLayout name="dashboard">
      <div class="py-4">
        <TablesIncomingInvestmentTable />
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: ["auth"],
});
</script>
