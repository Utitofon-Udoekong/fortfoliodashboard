<script lang="ts" setup>
</script>
<template>
  <div
    class="bg-white h-1/6 w-full flex justify-end items-center px-4"
  >
    <div class="price">
      <p>Current Dollar Price: <span class="font-semibold text-2xl">N590</span></p>
    </div>
    <div class="search-component w-1/6 mb-3">
      <div
        class="app-search-bar rounded-lg border border-[#D0D5DD] flex w-full h-11 px-4 py-2 focus-within:border-brand-light-blue"
      >
        <input
          type="search"
          class="placeholder-gray-500 w-full bg-transparent text-base font-normal text-gray-500 outline-none focus:border-none"
          placeholder="Set New Dollar Price"
          v-model="searchInput"
          @keyup="searchEvent"
        />
      </div>
    </div>
  </div>
</template>
<style></style>
