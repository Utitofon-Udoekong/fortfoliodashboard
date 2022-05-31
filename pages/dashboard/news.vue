<script lang="ts" setup>
import { getDownloadURL, listAll, ref as imageRef } from "@firebase/storage";

const { $storage } = useNuxtApp();
const news = ref([]);
const showError = ref(false);
const showSuccess = ref(false);
const notificationMessage = ref("");
const loading = ref(false);
const addedNews = ref([]);
const showAddModal = ref(false)

const loadingEvent = (e) => (loading.value = e);
const clearNews = () => news.value.length = 0
const fileChangeEvent = (e) => {
  addedNews.value.push(e);
};
const toggleShowAddModal = () => showAddModal.value = !showAddModal.value

const deleteSelectedNews = async (index) => {
  const newsObj = news.value[index];
  const ref = newsObj.ref;
  loading.value = true;
  await deleteNews(ref)
    .then(() => {
      loading.value = false;
      showSuccess.value = true;
      getNews();
      notificationMessage.value = "File deleted";
    })
    .catch((error) => {
      loading.value = false;
      showError.value = true;
      notificationMessage.value = `An error occured. Code: ${error}`;
    });
};



const getNews = async () => {
  //clearNews()
  // @ts-ignore
  const listRef = imageRef($storage, "news");
  await listAll(listRef)
    .then((res) => {
      loading.value = false;
      if (res.items.length > 0) {
        res.items.forEach(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          const obj = {
            ref: itemRef,
            url: url,
          }
          if(!news.value.includes(obj)){
            news.value.push(obj);
          }
        });
      }
    })
    .catch((error) => {
      loading.value = false;
      showError.value = true;
      notificationMessage.value = error;
      console.error(error);
    });
};

watchEffect(async () => {
  //clearNews()
  loading.value = true;
  const listRef = imageRef($storage, "news");
  await listAll(listRef)
    .then((res) => {
      loading.value = false;
      if (res.items.length > 0) {
        res.items.forEach(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          const obj = {
            ref: itemRef,
            url: url,
          }
          if(!news.value.includes(obj)){
            news.value.push(obj);
          }
        });
      }
    })
    .catch((error) => {
      loading.value = false;
      showError.value = true;
      notificationMessage.value = error;
      console.error(error);
    });
});

watch(showError, (newVal) => {
  if (newVal === true) {
    setTimeout(() => {
      showError.value = false;
    }, 1500);
  }
});

watch(showSuccess, (newVal) => {
  if (newVal === true) {
    setTimeout(() => {
      showSuccess.value = false;
    }, 1500);
  }
});
definePageMeta({
  layout: false,
  middleware: ["auth"],
});

</script>

<template>
  <div>
    <Notifications
      :showError="showError"
      :showSuccess="showSuccess"
      :message="notificationMessage"
    />
    <Loader :loading="loading" />
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
      <div>
        <div
          class="add-modal fixed inset-0 h-screen w-screen bg-gray-800/30 flex items-center justify-center"
  v-if="showAddModal"
        >
          <div class="modal max-w-2xl mx-auto bg-white p-8 relative">
            <i-ion-close-round
              class="text-black text-2xl absolute right-2 top-2 cursor-pointer"
              @click="toggleShowAddModal"
            />
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
          </div>
        </div>
        <div class="print-options flex justify-end mb-3">
          <div
            class="flex items-center cursor-pointer text-white px-4 py-2 rounded-md bg-brand-blue"
            @click="toggleShowAddModal"
          >
            <i-ion-add /> Add News
          </div>
        </div>
        <NewsComponent :newsList="news" @deleteNews="deleteSelectedNews" />
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
