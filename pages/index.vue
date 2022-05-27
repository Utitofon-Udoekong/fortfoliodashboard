<script setup lang="ts">
import { useUserStore } from "~~/store/userStore";

const store = useUserStore();
const loading = ref(false);
const newsList = ref([]);
const loadingEvent = (e) => (loading.value = e);
const news = computed(() => {
  return store.getNews;
});
const mama = async () => {
  await store.setNews();
};
const papa = () => {
  console.log(store.getNews);
};
const fileChangeEvent = (e) => {
  console.log(e);
  newsList.value.push(e);
};
const popNews = (index: number) => newsList.value.splice(index,1)
</script>

<template>
  <div>
    <Loader :loading="loading" />
    <BaseHeader />
    <div class="p-8">
      <div class="news">
        <DropZone @fileChange="fileChangeEvent" @loading="loadingEvent" />
        <div class="flex">
          <div
            class="image w-16 h-16 border overflow-hidden border-gray-400 rounded-md relative image-con mr-3"
            v-for="(news, index) in newsList"
            :key="index"
          >
            <div class="overlay">
              <i-mdi-close
                class="absolute right-1 top-1 cursor-pointer text-white w-full h-full"
                @click="popNews(index)"
              />
            </div>
            <img :src="news" alt="News" />
          </div>
        </div>
      </div>
      <button @click="mama" class="bg-brand-blue text-white mr-3 p-3">
        get news
      </button>
      <button @click="papa" class="bg-brand-blue text-white mr-3 p-3">
        print news
      </button>
    </div>
  </div>
</template>
