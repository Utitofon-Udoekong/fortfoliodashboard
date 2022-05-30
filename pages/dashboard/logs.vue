<script lang="ts" setup>
definePageMeta({
  layout: false,
  middleware: ["auth"],
});
</script>
<template>
    <div>
    <Html>
      <Head>
        <Title>logs</Title>
        <Meta name="description" content="Fortfolio Admin dashboard logs page" />
      </Head>
    </Html>
    <NuxtLayout name="dashboard">
        <p>I am a log</p>
    </NuxtLayout>
    </div>
</template>
<style>
</style>