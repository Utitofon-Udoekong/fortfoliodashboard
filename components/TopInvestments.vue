<script lang="ts" setup>
import { ComputedRef } from 'vue';

const openTab = ref(1);
const toggleTabs = (toggleNumber: number) => (openTab.value = toggleNumber);
interface Props {
  get3MonthsInvestment: ComputedRef<number>
  get6MonthsInvestment: ComputedRef<number>
  get12MonthsInvestment: ComputedRef<number>
}
const props = defineProps<Props>()
</script>
<template>
  <div class="p-5 bg-white rounded-md shadow w-full">
    <div class="flex flex-wrap">
      <div class="w-full">
        <div class="title mb-3">
          <p class="font-semibold text-base">Top Investment Plans</p>
        </div>
        <div class="border-b border-gray-400 mb-4 headers">
          <ul class="flex list-none flex-wrap flex-row -mb-px">
            <li class="mr-2 ml-5">
              <a
                href="#"
                :class="{
                  'text-gray-500 hover:text-gray-600 border-transparent':
                    openTab !== 1,
                  'text-brand-light-blue border-brand-light-blue':
                    openTab === 1,
                }"
                class="inline-block pb-2 px-4 text-sm font-medium text-center rounded-t-lg border-b-2"
                @click="toggleTabs(1)"
                >3 months</a
              >
            </li>
            <li class="mr-2">
              <a
                href="#"
                :class="{
                  'text-gray-500 hover:text-gray-600 border-transparent':
                    openTab !== 2,
                  'text-brand-light-blue border-brand-light-blue':
                    openTab === 2,
                }"
                class="inline-block pb-2 px-4 text-sm font-medium text-center rounded-t-lg border-b-2"
                @click="toggleTabs(2)"
                >6 months</a
              >
            </li>
            <li class="mr-2">
              <a
                href="#"
                :class="{
                  'text-gray-500 hover:text-gray-600 border-transparent':
                    openTab !== 3,
                  'text-brand-light-blue border-brand-light-blue':
                    openTab === 3,
                }"
                class="inline-block pb-2 px-4 text-sm font-medium text-center rounded-t-lg border-b-2"
                @click="toggleTabs(3)"
                >1 year</a
              >
            </li>
          </ul>
        </div>
        <div class="relative flex flex-col min-w-0 break-words w-full mb-6 body">
          <div class="px-4 py-5 flex-auto">
            <div class="tab-content tab-space">
              <!-- 3 months -->
              <div
                :class="{ hidden: openTab !== 1, block: openTab === 1 }"
              >
                <div class="fortdollar mb-5">
                    <div class="mb-2 text-sm text-gray-500 flex justify-between items-center">
                  <p class="">Fortdollar</p>
                  <p>{{props.get3MonthsInvestment("FortDollar Investment")}}%</p>
                </div>

                <div class="w-full bg-gray-200 rounded-full h-1.5">
                <div class="bg-brand-light-blue h-1.5 rounded-full" style="width: {{props.get3MonthsInvestment('FortDollar Investment')}}%"></div>
                </div>
                </div>

                <div class="fortcrypto mb-5">
                    <div class="mb-2 text-sm text-gray-500 flex justify-between items-center">
                  <p class="">FortCrypto</p>
                  <p>{{props.get3MonthsInvestment("FortCrypto Investment")}}%</p>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-1.5">
                <div class="bg-brand-blue h-1.5 rounded-full" style="width: {{props.get3MonthsInvestment('FortCrypto Investment')}}%"></div>
                </div>
                </div>
                
                <div class="fortshield">
                    <div class="mb-2 text-sm text-gray-500 flex justify-between items-center">
                  <p class="">FortShield</p>
                  <p>{{props.get3MonthsInvestment("FortShield Investment")}}%</p>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-1.5">
                <div class="bg-brand-green h-1.5 rounded-full" style="width: {{props.get3MonthsInvestment('FortShield Investment')}}%"></div>
                </div>
                </div>
              </div>
              <!-- 6 months -->
              <div
                :class="{ hidden: openTab !== 2, block: openTab === 2 }"
              >
                <div class="fortdollar mb-5">
                    <div class="mb-2 text-sm text-gray-500 flex justify-between items-center">
                  <p class="">Fortdollar</p>
                  <p>{{props.get6MonthsInvestment("FortDollar Investment")}}%</p>
                </div>

                <div class="w-full bg-gray-200 rounded-full h-1.5">
                <div class="bg-brand-light-blue h-1.5 rounded-full" style="width: {{props.get6MonthsInvestment('FortDollar Investment')}}%"></div>
                </div>
                </div>

                <div class="fortcrypto mb-5">
                    <div class="mb-2 text-sm text-gray-500 flex justify-between items-center">
                  <p class="">FortCrypto</p>
                  <p>{{props.get6MonthsInvestment("FortCrypto Investment")}}%</p>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-1.5">
                <div class="bg-brand-blue h-1.5 rounded-full" style="width: {{props.get6MonthsInvestment('FortCrypto Investment')}}%"></div>
                </div>
                </div>
                
                <div class="fortshield">
                    <div class="mb-2 text-sm text-gray-500 flex justify-between items-center">
                  <p class="">FortShield</p>
                  <p>{{props.get6MonthsInvestment("FortShield Investment")}}%</p>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-1.5">
                <div class="bg-brand-green h-1.5 rounded-full" style="width: {{props.get6MonthsInvestment('FortShield Investment')}}%"></div>
                </div>
                </div>
              </div>
              <!-- 12 months -->
              <div
                :class="{ hidden: openTab !== 3, block: openTab === 3 }"
              >
                <div class="fortdollar mb-5">
                    <div class="mb-2 text-sm text-gray-500 flex justify-between items-center">
                  <p class="">Fortdollar</p>
                  <p>{{props.get12MonthsInvestment("FortDollar Investment")}}%</p>
                </div>

                <div class="w-full bg-gray-200 rounded-full h-1.5">
                <div class="bg-brand-light-blue h-1.5 rounded-full" style="width: {{props.get12MonthsInvestment('FortDollar Investment')}}%"></div>
                </div>
                </div>

                <div class="fortcrypto mb-5">
                    <div class="mb-2 text-sm text-gray-500 flex justify-between items-center">
                  <p class="">FortCrypto</p>
                  <p>{{props.get12MonthsInvestment("FortCrypto Investment")}}%</p>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-1.5">
                <div class="bg-brand-blue h-1.5 rounded-full" style="width: {{props.get12MonthsInvestment('FortCrypto Investment')}}%"></div>
                </div>
                </div>
                
                <div class="fortshield">
                    <div class="mb-2 text-sm text-gray-500 flex justify-between items-center">
                  <p class="">FortShield</p>
                  <p>{{props.get12MonthsInvestment("FortShield Investment")}}%</p>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-1.5">
                <div class="bg-brand-green h-1.5 rounded-full" style="width: {{props.get12MonthsInvestment('FortShield Investment')}}%"></div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <LineChart/>
    </div>
  </div>
</template>
<style></style>
