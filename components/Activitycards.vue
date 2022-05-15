<script lang="ts" setup>
import { useUserStore } from '~~/store/users';

const store = useUserStore()
const userCount = store.getUserCount
const details = [
  {
    url: "users",
    numbers: `${userCount}`,
    title: "New users",
  },
  {
    url: "chart",
    numbers: "$ 47,866.00",
    title: "Total investment",
  },
  {
    url: "graph",
    numbers: "$ 15,487.00",
    title: "Total due investment",
  },
];
</script>
<template>
  <div class="flex gap-3 mb-12">
    <div
      class="card rounded-[10px] bg-white py-8 px-[50px] flex justify-center items-center w-full"
      v-for="(detail, index) in details"
    >
      <PNGImage :path="detail.url" :alt="`users-${index}`" class="mr-4" />
      <div class="details">
        <p class="text-xl font-semibold text-[#171717]">{{ detail.numbers }}</p>
        <p class="text-lg font-medium text-brand-ash">{{ detail.title }}</p>
      </div>
    </div>
  </div>
</template>
<style></style>
