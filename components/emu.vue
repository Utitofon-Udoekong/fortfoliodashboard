<script lang="ts" setup>
import { $array } from "alga-js";
import { entryData } from "assets/entries";
import { TableData } from "~~/utils/types/table";

const columns = [
  { name: "id", text: "ID" },
  { name: "name", text: "Name" },
  { name: "position", text: "Position" },
  { name: "office", text: "Office" },
  { name: "extension", text: "Extension" },
  { name: "startDate", text: "StartDate" },
  { name: "salary", text: "Salary" },
];
const entries = ref<TableData[]>(entryData);
const getAllEmployees = () => {};
let filteredEntries = ref<TableData[]>([]);
const paginateEntries = () => {
  if(searchInput.value.length >= 3) {
    searchEntries.value = $array.search(searchInput.value, entries.value)
    paginateData(searchEntries.value)
  } else {
    searchEntries.value = []
    paginateData(entries.value)
  }
};
const paginateData = (data: any) => {
  filteredEntries.value = $array.paginate( data, currentPage.value, currentEntries.value )
   totalPages.value = $array.pages(data, currentEntries.value)
}
const showEntries = ref<number[]>([5, 10, 15, 20, 25, 50, 100]);
const currentEntries = ref<number>(10);
const showInfo = computed(() => {
  const getCurrentEntries = searchEntries.value.length <= 0 ? entries.value : searchEntries.value
  return $array.show(getCurrentEntries, currentPage.value, currentEntries.value);
});
onMounted(() => {
    paginateData(entries.value)
})
const currentPage = ref<number>(1)
const totalPages = ref<number>(1)
const showPagination = computed(() => {
    return $array.pagination(totalPages.value, currentPage.value, 3)
})
const paginateEvent = (page) => {
    currentPage.value = page
    paginateEntries()
}
const searchInput = ref<string>('')
const searchEntries = ref<string[]>([])
const searchEvent = () => {
  currentPage.value = 1
  paginateEntries()
}

provide('raw',computed(() => searchEntries.value.length <= 0 ? entries.value : searchEntries.value))
</script>
<template>
  <div class="p-5">
      <div class="flex mb-3">
    <div class="flex items-center">
      <span class="mr-1">Show</span>
      <select v-model="currentEntries" @change="paginateEntries">
        <option :value="entries" v-for="(entries, i) in showEntries" :key="i">
          {{ entries }}
        </option>
      </select>
      <span class="ml-1">Entries</span>
    </div>
    <div class="flex justify-end w-6">
      <input type="search" class="w-6" placeholder="Search" v-model="searchInput" @keyup="searchEvent">
    </div>
    {{searchInput}}
  </div>
  <Emele2 :columns="columns" :entries="filteredEntries" />

  <div class="flex justify-between my-3">
    <div>
      Show {{ showInfo.from }} to {{ showInfo.to }} of {{ showInfo.of }} entries
    </div>
    <div class="flex justify-end">
        <ul class="pagination flex jsutify-between">
          <!-- first -->
          <li :class="['',{'text-gray-400 pointer-events-none': currentPage === 1}]">
            <a href="#" @click.prevent="currentPage = 1,  paginateEntries()">First</a>
          </li>  
          <!-- prev -->
          <li :class="['',{'text-gray-400 pointer-events-none': currentPage === 1}]">
            <a href="#" @click.prevent="(currentPage < 1) ? currentPage = 1 : currentPage -= 1,  paginateEntries()">Prev</a>
          </li>  
          <!-- pagination list -->
          <li v-for="(pagination, i) in showPagination" :key="i" :class="['',{'text-blue-800': pagination === currentPage}]">
              <a href="#" @click.prevent="paginateEvent(pagination)">{{pagination}}</a>
          </li>  
          <!-- next -->
          <li :class="['',{'text-gray-400 pointer-events-none': currentPage === totalPages}]">
              <a href="#" @click.prevent="(currentPage > totalPages) ? currentPage = totalPages : currentPage += 1,  paginateEntries()">Next</a>
          </li>  
          <!-- Last -->
          <li :class="['',{'text-gray-400 pointer-events-none': currentPage === totalPages}]">
              <a href="#" @click.prevent="currentPage = totalPages,  paginateEntries()">Last</a>
          </li>  
        </ul>
    </div>
  </div>
  </div>
</template>
<style></style>
