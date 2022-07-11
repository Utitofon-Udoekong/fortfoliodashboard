<template>
  <div>
    <Html>
    <Head>
        <Title>Dashboard - Users Pending Delete</Title>
        <Meta
          name="description"
          content="Fortfolio Admin dashboard users pending deletion page"
        />
      </Head>
    </Html>
    <NuxtLayout name="dashboard">
      <TablesDeleteUsersTable />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: ["auth"]
});
</script>
