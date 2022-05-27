<script setup lang="ts">
const { $storage } = useNuxtApp();
const loading = ref(false);
const addedNews = ref([]);
const loadingEvent = (e) => (loading.value = e);
const news = ref([]);
const getNews = async () => {
  // @ts-ignore
  const { newsList } = await listNews($storage);
  news.value = newsList;
};

const fileChangeEvent = (e) => {
  addedNews.value.push(e);
};

onMounted(async() => {
   await getNews()
})
</script>

<template>
  <div>
    <Loader :loading="loading" />
    <BaseHeader />
    <div class="p-8">
      <div class="mb-5">
        <DropZone @fileChange="fileChangeEvent" @loading="loadingEvent" />
        <div class="flex">
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
            <img :src="news" alt="news" lazy class="w-full h-full object-contain"/>
          </div>
        </div>
      </div>
      <button @click="getNews" class="bg-brand-blue text-white mr-3 p-3">
        get news
      </button>
      <client-only>
        <div class="news grid auto-cols-auto my-4">
          <div class="w-24 h-24 border overflow-hidden relative border-gray-400 rounded-md mx-3" v-for="(item, index) in news" :key="index">
            <img :src="item" :alt="`News-${index}`" class="w-full h-full " />
          </div>
        </div>
      </client-only>
    </div>
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
