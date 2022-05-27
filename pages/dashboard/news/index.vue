<script lang="ts" setup>
const { $storage } = useNuxtApp();
const news = ref([]);
const getNews = async () => {
  // @ts-ignore
  await listNews($storage)
    .then((newsList: any[]) => {
      news.value = newsList;
    })
    .catch((error) => {
      console.error(error);
    });
};
definePageMeta({
  layout: false,
  // middleware: ["auth"]
});
watchEffect(async () => {
  await getNews();
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
      <NewsComponent :newsList="news" />
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
