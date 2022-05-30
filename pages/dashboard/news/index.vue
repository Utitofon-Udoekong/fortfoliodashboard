<script lang="ts" setup>
import { getDownloadURL, listAll, ref as imageRef } from "@firebase/storage";

const { $storage } = useNuxtApp();
const news = ref([]);
const showError = ref(false);
const showSuccess = ref(false);
const loading = ref(false);
const notificationMessage = ref("");

const deleteSelectedNews = async (index) => {
  const newsObj = news.value[index];
  const ref = newsObj.ref;
  loading.value = true
  await deleteNews(ref)
    .then(() => {
      loading.value = false
      showSuccess.value = true;
      getNews();
      notificationMessage.value = "File deleted";
    })
    .catch((error) => {
      loading.value = false
      showError.value = true;
      notificationMessage.value = `An error occured. Code: ${error}`;
    });
};

const getNews = async () => {
  // @ts-ignore
  const listRef = imageRef($storage, "news");

  await listAll(listRef)
    .then((res) => {
      loading.value = false
      if(res.items.length > 0){
        res.items.forEach(async (itemRef) => {
          const url = await getDownloadURL(itemRef)
          news.value.push({
            ref: itemRef,
            url: url
          })
        });
      }
    })
    .catch((error) => {
      loading.value = false
      showError.value = true
      notificationMessage.value = error
      console.error(error)
    });
};

watchEffect(async () => {
  loading.value = true;
  const listRef = imageRef($storage, "news");

  await listAll(listRef)
    .then((res) => {
      loading.value = false
      if(res.items.length > 0){
        res.items.forEach(async (itemRef) => {
          const url = await getDownloadURL(itemRef)
          news.value.push({
            ref: itemRef,
            url: url
          })
        });
      }
    })
    .catch((error) => {
      loading.value = false
      showError.value = true
      notificationMessage.value = error
      console.error(error)
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
// onMounted(async () => {
//   await getNews()
// })
</script>

<template>
  <Notifications
    :showError="showError"
    :showSuccess="showSuccess"
    :message="notificationMessage"
  />
  <Loader :loading="loading" />
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
      <NewsComponent :newsList="news" @deleteNews="deleteSelectedNews" />
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
