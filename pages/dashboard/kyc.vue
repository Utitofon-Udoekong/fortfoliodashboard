<template>
  <div>
    <Html>
      <Head>
        <Title>Dashboard - KYC</Title>
        <Meta name="description" content="Fortfolio Admin dashboard Kyc page" />
      </Head>
    </Html>
    <NuxtLayout name="dashboard">
      <TablesKYCTable />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: ["auth"],
});
</script>
