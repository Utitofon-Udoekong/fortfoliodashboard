<script lang="ts" setup>
const { $storage } = useNuxtApp();
const news = ref([]);
const getNews = async () => {
  // @ts-ignore
  const { newsList } = await listNews($storage);
  news.value = newsList;
};
onMounted(async () => {
  await getNews();
});
definePageMeta({
  layout: false,
  // middleware: ["auth"]
});
</script>

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
      <div class="news grid auto-cols-auto my-4">
        <div
          class="w-24 h-24 border overflow-hidden relative border-gray-400 rounded-md mx-3"
          v-for="(item, index) in news"
          :key="index"
        >
          <img :src="item" :alt="`News-${index}`" class="w-full h-full" />
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<style>
.overlay {
  background: rgba(19, 19, 19, 0.479);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
}
.image-con:hover .overlay {
  display: unset;
}
</style>
