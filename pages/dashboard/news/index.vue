
<template>
  <div>
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
      <NewsComponent/>
  </NuxtLayout>
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: false,
  // middleware: ["auth"]
});
</script>