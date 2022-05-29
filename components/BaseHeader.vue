<script lang="ts" setup>
import { query, onSnapshot, doc } from '@firebase/firestore';

const {$firestore} = useNuxtApp()
const config = useRuntimeConfig()
const newPrice = ref<number>(null)
const price = ref<number>(0)
const showError = ref(false);
const showSuccess = ref(false);
const notificationMessage = ref("");

const changePrice = async () => {
  const {changed} = await changeDollarPrice(newPrice.value, $firestore)
  if(changed){
    newPrice.value = null
      showSuccess.value = true
      notificationMessage.value = "Price Updated"
    // await getPrice().then(() => {
    // })
  }else{
    showError.value = true
    notificationMessage.value = "Encountered a server error"
  }
}
const snapPrice = (snap) => price.value = snap
const getPrice = async () => {
  const zazu = await getDollarPrice($firestore)
  price.value = zazu
}
watchEffect(() =>{
  const unsubscribe = onSnapshot(doc($firestore,"egoPrice",config.EGO_ID), (querySnapshot) => {
    const docData = querySnapshot.data()
    snapPrice(docData["dollarToNaira"])
  });
})
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

onMounted(async () => {
  // await getPrice()
})

</script>
<template>
  <div
    class="bg-white h-1/6 w-full flex justify-end items-center px-4"
  >
  <Notifications
      :showError="showError"
      :showSuccess="showSuccess"
      :message="notificationMessage"
    />
    <div class="price mr-4">
      <p>Current Dollar Price: <span class="font-semibold text-2xl">N{{price}}</span></p>
    </div>
    <div class="search-component w-1/6 mr-3">
      <div
        class="app-search-bar rounded-lg border border-[#D0D5DD] flex w-full h-11 px-4 py-2 focus-within:border-brand-light-blue"
      >
        <input
          type="text"
          class="placeholder-gray-500 w-full bg-transparent text-base font-normal text-gray-500 outline-none focus:border-none"
          placeholder="Set New Dollar Price"
          v-model="newPrice"
        />
      </div>
    </div>
    <div v-if="newPrice > 0">
      <button class="p-2 rounded-md bg-brand-blue text-white" @click="changePrice">Save Price</button>
    </div>
  </div>
</template>
<style></style>
