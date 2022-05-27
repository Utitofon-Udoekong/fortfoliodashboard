<script setup lang="ts">
import { useUserStore } from "~~/store/userStore";

const store = useUserStore();
const loading = ref(false);
const newsList = ref([]);
const loadingEvent = (e) => (loading.value = e);
// const news = computed(() => {
//   return store.getNews;
// });

const fileChangeEvent = (e) => {
  console.log(e);
  newsList.value.push(e);
};
</script>

<template>
  <div>
    <Loader :loading="loading" />
    <BaseHeader />
    <div class="p-8">
      <div class="news mb-5">
        <DropZone @fileChange="fileChangeEvent" @loading="loadingEvent" />
        <div class="flex">
          <div class="image w-16 h-16 border overflow-hidden border-gray-400 rounded-md relative image-con mx-3" v-for="(news, index) in newsList" :key="index">
        <div class="overlay">
            <i-mdi-check class="absolute right-1 top-1 cursor-pointer text-white text-sm "/>
        </div>
        <img :src="news" alt="news" lazy>
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
    {{news}}
  </div>
</template>
<style>
.overlay{
    background: rgba(19, 19, 19, 0.479);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
}
.image-con:hover .overlay{
    display: unset;
}
</style>