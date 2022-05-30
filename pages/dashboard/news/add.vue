<script lang="ts" setup>
definePageMeta({
  layout: false,
  middleware: ["auth"]
});

const loading = ref(false);
const addedNews = ref([]);
const loadingEvent = (e) => (loading.value = e);
const fileChangeEvent = (e) => {
  addedNews.value.push(e);
};

</script>
<template>
  <div>
    <Loader :loading="loading" />
    <Html>
      <Head>
        <Title>Dashboard - Add News</Title>
        <Meta
          name="description"
          content="Fortfolio Admin dashboard news Add page"
        />
      </Head>
    </Html>
    <NuxtLayout name="dashboard">
      <DropZone @fileChange="fileChangeEvent" @loading="loadingEvent" />
      <div class="flex my-3" v-if="addedNews.length > 0">
        <div
          class="image w-16 h-16 border overflow-hidden border-gray-400 rounded-md relative image-con mx-3"
          v-for="(news, index) in addedNews"
          :key="index"
        >
          <div class="overlay">
            <i-mdi-check
              class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 cursor-pointer text-white text-xl"
            />
          </div>
          <img :src="news" alt="news" lazy class="w-full h-full" />
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>
<style></style>
