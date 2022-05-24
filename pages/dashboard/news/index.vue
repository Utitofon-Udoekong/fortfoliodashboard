
<template>
    <Html>
        <Head>
        <Title>Dashboard - News</Title>
        <Meta
            name="description"
            content="Fortfolio Admin dashboard news page"
        />
        </Head>
    </Html>
  <NuxtLayout name="dashboard">
      <p>News</p>
  </NuxtLayout>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: false,
});
</script>