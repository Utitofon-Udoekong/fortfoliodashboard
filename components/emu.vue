<script lang="ts" setup>
import { array, object } from "alga-js";
import { entryData } from "assets/entries";
import { TestTableData, TableHeader } from "~~/utils/types/table";


// states
const columns = [
  { name: "id", text: "ID" },
  { name: "name", text: "Name" },
  { name: "position", text: "Position" },
  { name: "office", text: "Office" },
  { name: "extension", text: "Extension" },
  { name: "startDate", text: "StartDate" },
  { name: "salary", text: "Salary" },
];
let col: TestTableData = reactive({
  id: "",
  name: "",
  extension: "",
  office: "",
  position: "",
  salary: "",
  startDate: "",
});
let sortCol: TestTableData = reactive({
  id: "",
  name: "",
  extension: "",
  office: "",
  position: "",
  salary: "",
  startDate: "",
});
const entries = ref<TestTableData[]>(entryData);
let filteredEntries = ref<TestTableData[]>([]);
const showEntries = ref<number[]>([5, 10, 15, 20, 30, 50, 100]);
const currentEntries = ref<number>(10);
const searchInput = ref<string>("");
const searchEntries = ref<string[]>([]);
const currentPage = ref<number>(1);
const totalPages = ref<number>(1);
// states------------------------------------------------------------------------------


// methods
const uniqColumnData = (column: string) => {
  return array.uniq(getCurrentEntries(), column);
};
const filterByColumn = () => {
  const filterCol = object.removeBy(col, "");
  let filterData = getCurrentEntries()
  if(Object.entries(filterCol).length >= 1) {
    filterData = array.filter( getCurrentEntries(), filterCol)
  }
  paginateData(filterData)
};
const getAllEmployees = () => {};
const paginateEntries = () => {
  if (searchInput.value.length >= 3) {
    searchEntries.value = array.search(entries.value,searchInput.value);
    paginateData(searchEntries.value);
  } else {
    searchEntries.value = [];
    paginateData(entries.value);
    col = {
      id: "",
    name: "",
    extension: "",
    office: "",
    position: "",
    salary: "",
    startDate: "",
    }
  }
};
const paginateData = (data: any) => {
  filteredEntries.value = array.paginate(
    data,
    currentPage.value,
    currentEntries.value
  );
  totalPages.value = array.pages(data, currentEntries.value);
};
const paginateEvent = (page: number) => {
  currentPage.value = page;
  paginateEntries();
};

const searchEvent = () => {
  currentPage.value = 1;
  paginateEntries();
};

const getCurrentEntries = () => {
  return searchEntries.value.length <= 0 ? entries.value : searchEntries.value;
};

const sortByColumn = (column) => {
  col = {
    id: "",
    name: "",
    extension: "",
    office: "",
    position: "",
    salary: "",
    startDate: "",
  }
  let sortedEntries = getCurrentEntries()
  let sortedColumn = sortCol[column]
  if(sortedColumn === ''){
    sortCol[column] = 'asc'
    sortedEntries = array.sortBy(getCurrentEntries(),'asc',column)
  }else if(sortedColumn === 'asc'){
    sortCol[column] = 'desc'
    sortedEntries = array.sortBy(getCurrentEntries(),'desc',column)
  }else if(sortedColumn === 'desc'){
    sortCol[column] = ''
  }
  paginateData(sortedEntries)
}
// methods------------------------------------------------------------------------------


// computed
const showInfo = computed(() => {
  // const getCurrentEntries = getCurrentEntries()
  return array.show(
    getCurrentEntries(),
    currentPage.value,
    currentEntries.value
  );
});
const tableHeader = computed<TableHeader[]>(() => {
  return columns;
});
const tableData = computed<TestTableData[]>(() => {
  return filteredEntries.value || [];
});


const showPagination = computed(() => {
  let stringArray = array.pagination(totalPages.value, currentPage.value, 3);
  const numberArray = stringArray.map((str) => {
    return Number(str)
  })
  return numberArray
});

// computed------------------------------------------------------------------------------

// lifecycle
onMounted(() => {
  paginateData(entries.value);
});
// lifecycle----------------------------------------------------------------------------------
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
        <input
          type="search"
          class="w-6"
          placeholder="Search"
          v-model="searchInput"
          @keyup="searchEvent"
        />
      </div>
      {{ searchInput }}
    </div>
    <!-- Emele -->
    <table>
      <thead>
        <tr>
          <th v-for="(header, index) in tableHeader" :key="index">
            <div class="flex items-center">
              <span>{{ header.text }}</span>
              <span @click.prevent="sortByColumn(header.name)">
                <i-mdi-filter-variant class="pointer-events-none" />
              </span>
            </div>
          </th>
        </tr>
        <tr>
          <td>
            <input
              type="search"
              placeholder="Filter id"
              v-model="col.id"
              @keyup="filterByColumn"
            />
          </td>
          <td>
            <input
              type="search"
              placeholder="Filter name"
              v-model="col.name"
              @keyup="filterByColumn"
            />
          </td>
          <td>
            <select v-model="col.position" @change="filterByColumn">
              <option value>-- Filter Position --</option>
              <option
                v-for="(cd, i) in uniqColumnData('position')"
                :key="i"
                :value="cd"
              >
                {{ cd }}
              </option>
            </select>
          </td>
          <td>
            <input
              type="search"
              placeholder="Filter office"
              v-model="col.office"
              @keyup="filterByColumn"
            />
          </td>
          <td>
            <input
              type="search"
              placeholder="Filter extension"
              v-model="col.extension"
              @keyup="filterByColumn"
            />
          </td>
          <td>
            <input
              type="search"
              placeholder="Filter startDate"
              v-model="col.startDate"
              @keyup="filterByColumn"
            />
          </td>
          <td>
            <input
              type="search"
              placeholder="Filter salary"
              v-model="col.salary"
              @keyup="filterByColumn"
            />
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, index) in tableData" :key="index">
          <td>{{ data.id }}</td>
          <td>{{ data.name }}</td>
          <td>{{ data.position }}</td>
          <td>{{ data.office }}</td>
          <td>{{ data.extension }}</td>
          <td>{{ data.startDate }}</td>
          <td>{{ data.salary }}</td>
        </tr>
      </tbody>
    </table>
    <!-- ======================= -->

    <div class="flex justify-between my-3">
      <div>
        Show {{ showInfo.from }} to {{ showInfo.to }} of
        {{ showInfo.of }} entries
      </div>
      <div class="flex justify-end">
        <ul class="pagination flex jsutify-between">
          <!-- first -->
          <li
            :class="[
              '',
              { 'text-gray-400 pointer-events-none': currentPage === 1 },
            ]"
          >
            <a href="#" @click.prevent="(currentPage = 1), paginateEntries()"
              >First</a
            >
          </li>
          <!-- prev -->
          <li
            :class="[
              '',
              { 'text-gray-400 pointer-events-none': currentPage === 1 },
            ]"
          >
            <a
              href="#"
              @click.prevent="
                currentPage < 1 ? (currentPage = 1) : (currentPage -= 1),
                  paginateEntries()
              "
              >Prev</a
            >
          </li>
          <!-- pagination list -->
          <li
            v-for="(pagination, i) in showPagination"
            :key="i"
            :class="['', { 'text-blue-800': pagination === currentPage }]"
          >
            <a href="#" @click.prevent="paginateEvent(pagination)">{{ pagination }}</a>
          </li>
          <!-- next -->
          <li
            :class="[
              '',
              {
                'text-gray-400 pointer-events-none': currentPage === totalPages,
              },
            ]"
          >
            <a
              href="#"
              @click.prevent=" currentPage > totalPages ? (currentPage = totalPages) : (currentPage += 1), paginateEntries() "
              >Next</a
            >
          </li>
          <!-- Last -->
          <li
            :class="[ '', { 'text-gray-400 pointer-events-none': currentPage === totalPages, }, ]"
          >
            <a
              href="#"
              @click.prevent="(currentPage = totalPages), paginateEntries()"
              >Last</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style></style>
