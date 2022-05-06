<script lang="ts" setup>
import { useUserStore } from '~~/store/users';

const store = useUserStore()
const userCount = store.getUserCount
const details = [
  {
    url: "users",
    numbers: `${userCount}`,
    title: "New users",
    percentage: "4.07%",
  },
  {
    url: "chart",
    numbers: "$ 47,866.00",
    title: "Total investment",
    percentage: "0.24%",
  },
  {
    url: "graph",
    numbers: "$ 15,487.00",
    title: "Total due investment",
    percentage: "1.64%",
  },
];
</script>
<template>
  <div class="flex gap-3 mb-12">
    <div
      class="card rounded-[10px] bg-white py-8 px-[50px] flex justify-around items-center w-full"
      v-for="(detail, index) in details"
    >
      <PNGImage :path="detail.url" :alt="`users-${index}`" class=""/>
      <div class="details">
        <p class="text-lg font-semibold text-[#171717]">{{ detail.numbers }}</p>
        <p class="text-sm font-medium text-brand-ash">{{ detail.title }}</p>
        <span class="text-sm font-medium text-brand-ash flex justify-between">
          <i-mdi-trending-up class="pr-1 text-brand-green" />
          <p class="text-brand-green pr-2">{{ detail.percentage }}</p>
          <p class="text-brand-ash">This month</p>
        </span>
      </div>
    </div>
  </div>
</template>
<style></style>
