<template>
  <div>
    <Html>
    <Head>
        <Title>Dashboard - Users</Title>
        <Meta
          name="description"
          content="Fortfolio Admin dashboard landing page"
        />
      </Head>
    </Html>
    <NuxtLayout name="dashboard">
      <TablesUsersTable />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: ["auth"]
});
</script>
