<script lang="ts" setup>
const openTab = ref(1);
const toggleTabs = (toggleNumber: number) => (openTab.value = toggleNumber);
interface Props{
  activeInvestments: number
  activeInvestmentAmount: number
  currentMonthsInvestmentAmount: number
}
const props = defineProps<Props>()
</script>
<template>
  <div class="p-5 bg-white rounded-md shadow w-full">
      <div class="flex flex-wrap">
    <div class="w-full">
        <div class="title mb-3">
            <p class="font-semibold text-base">Investment Overview</p>
        </div>
      <div class="border-b border-gray-400 mb-4">
        <ul class="flex list-none flex-wrap flex-row -mb-px ">
          <li class="mr-2 ml-5">
            <a
              href="#"
              :class="{
                'text-gray-500 hover:text-gray-600 border-transparent':
                  openTab !== 1,
                'text-brand-light-blue border-brand-light-blue': openTab === 1,
              }"
              class="inline-block pb-2 px-4 text-sm font-medium text-center rounded-t-lg border-b-2"
              @click="toggleTabs(1)"
              >Overview</a
            >
          </li>
          <li class="mr-2">
            <a
              href="#"
              :class="{
                'text-gray-500 hover:text-gray-600 border-transparent':
                  openTab !== 2,
                'text-brand-light-blue border-brand-light-blue': openTab === 2,
              }"
              class="inline-block pb-2 px-4 text-sm font-medium text-center rounded-t-lg border-b-2"
              @click="toggleTabs(2)"
              >This year</a
            >
          </li>
          <li class="mr-2">
            <a
              href="#"
              :class="{
                'text-gray-500 hover:text-gray-600 border-transparent':
                  openTab !== 3,
                'text-brand-light-blue border-brand-light-blue': openTab === 3,
              }"
              class="inline-block pb-2 px-4 text-sm font-medium text-center rounded-t-lg border-b-2"
              @click="toggleTabs(3)"
              >All time</a
            >
          </li>
        </ul>
      </div>
      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6"
      >
        <div class="px-4 py-5 flex-auto">
          <div class="tab-content tab-space">
            <div v-bind:class="{ hidden: openTab !== 1, block: openTab === 1 }">
              <p class="text-sm text-gray-400 pb-3">Currently Active Investment</p>
              <p class="text-lg font-medium pb-3">{{props.activeInvestments}} investment(s)</p>
              <p class="text-sm text-gray-400 pb-3">AMOUNT</p>
              <p class="text-lg font-medium pb-3">{{props.activeInvestmentAmount}} USD</p>
              <p class="text-sm text-gray-400 pb-3">PAID PROFIT</p>
              <p class="text-lg font-medium">49,395.395 USD</p>
              <hr>
              <p class="text-sm text-gray-400 pt-2 pb-5">Investment made this month</p>
              <p class="text-lg font-medium">{{props.currentMonthsInvestmentAmount.toLocaleString()}} USD</p>
              <p class="text-sm text-gray-400">AMOUNT</p>
            </div>
            <div v-bind:class="{ hidden: openTab !== 2, block: openTab === 2 }">
              <p class="text-sm text-gray-400 pb-3">Currently Active Investment</p>
              <p class="text-lg font-medium">49,395.395 USD</p>
              <p class="text-sm text-gray-400 pb-6">AMOUNT</p>
              <p class="text-lg font-medium">49,395.395 USD</p>
              <p class="text-sm text-gray-400 pb-3">PAID PROFIT</p>
              <hr>
              <p class="text-sm text-gray-400 pt-2 pb-5">Investment made this month</p>
              <p class="text-lg font-medium">49,395.395 USD</p>
              <p class="text-sm text-gray-400">AMOUNT</p>
            </div>
            <div v-bind:class="{ hidden: openTab !== 3, block: openTab === 3 }">
              <p class="text-sm text-gray-400 pb-3">Currently Active Investment</p>
              <p class="text-lg font-medium">49,395.395 USD</p>
              <p class="text-sm text-gray-400 pb-6">AMOUNT</p>
              <p class="text-lg font-medium">49,395.395 USD</p>
              <p class="text-sm text-gray-400 pb-3">PAID PROFIT</p>
              <hr>
              <p class="text-sm text-gray-400 pt-2 pb-5">Investment made this month</p>
              <p class="text-lg font-medium">49,395.395 USD</p>
              <p class="text-sm text-gray-400">AMOUNT</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<style></style>
