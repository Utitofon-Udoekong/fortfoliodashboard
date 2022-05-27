<template>
  <div>
    <Html>
      <Head>
        <Title>Dashboard - Withdrawal</Title>
        <Meta
          name="description"
          content="Fortfolio Admin dashboard withdrawal page"
        />
      </Head>
    </Html>
    <NuxtLayout name="dashboard">
      <TablesWithdrawalsTable />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: ["auth"],
});
</script>
