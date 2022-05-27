<script setup>
const {$firestore} = useNuxtApp()
const newPrice = ref(0)
const price = ref(0)
const getDollarPrice = async () => {
  const zazu = await getDollarPrice($firestore)
  price.value = zazu.data.dollarToNaira
}
</script>
<template>
  <div
    class="bg-white h-1/6 w-full flex justify-end items-center px-4"
  >
    <div class="price mr-4">
      <p>Current Dollar Price: <span class="font-semibold text-2xl">N{{price}}</span></p>
    </div>
    <div class="search-component w-1/6 mb-3">
      <div
        class="app-search-bar rounded-lg border border-[#D0D5DD] flex w-full h-11 px-4 py-2 focus-within:border-brand-light-blue"
      >
        <input
          type="search"
          class="placeholder-gray-500 w-full bg-transparent text-base font-normal text-gray-500 outline-none focus:border-none"
          placeholder="Set New Dollar Price"
          v-model="newPrice"
        />
      </div>
    </div>
    <div v-if="newPrice.length > 0">
      <button class="p-3 rounded-md bg-brand-blue" @click="changePrice">Save</button>
    </div>
  </div>
</template>
<style></style>
