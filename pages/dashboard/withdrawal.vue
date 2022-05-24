<template>
  <!-- <Html>
    <Head>
      <Title>Dashboard - Withdrawal</Title>
      <Meta
        name="description"
        content="Fortfolio Admin dashboard withdrawal page"
      />
    </Head>
  </Html> -->
  <NuxtLayout name="dashboard">
    <TablesWithdrawalsTable />
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>
