<script lang="ts" setup>
import { investments } from "~~/assets/investments";
import { InvestmentTableData, TableHeader } from "~~/utils/types/table";
import { array, file, object } from "alga-js";

// states
const columns = [
  { name: "id", text: "User ID" },
  { name: "payment_for", text: "Payment For" },
  { name: "amount_invested", text: "Amount Invested" },
  { name: "payment_date", text: "Payment Date" },
  { name: "due_date", text: "Due Date" },
  { name: "status", text: "Status" },
];
let col: InvestmentTableData = reactive({
  id: null,
  payment_for: "",
  amount_invested: null,
  payment_date: "",
  due_date: "",
  status: "",
});
let sortCol: InvestmentTableData = reactive({
  id: null,
  payment_for: "",
  amount_invested: null,
  payment_date: "",
  due_date: "",
  status: "",
});
const investmentsData = ref<InvestmentTableData[]>(investments);
let filteredInvestment = ref<InvestmentTableData[]>([]);
const showInvestment = ref<number[]>([5, 10, 15, 20, 30, 50, 100]);
const currentInvestment = ref<number>(10);
const searchInput = ref<string>("");
const searchInvestment = ref<string[]>([]);
const currentPage = ref<number>(1);
const totalPages = ref<number>(1);
let show = ref<number | null>(null);
let showUserData = ref(false);

const topPos = ref(0);
const leftPos = ref(0);
let editableUser: InvestmentTableData[] = [];
const openTab = ref(1);
let showModal = ref(false)
// states------------------------------------------------------------------------------

// methods
const selectRow = (user: InvestmentTableData) => {
  editableUser.push(user);
  showUserData.value = true;
};
const toggleTabs = (toggleNumber: number) => (openTab.value = toggleNumber);

const getHeight = async (e: MouseEvent) => {
  topPos.value = e.pageY + 20;
  leftPos.value = e.pageX - 120;
  // console.log(top.value, left.value)
};
const toggleUserData = () => {
  showUserData.value = !showUserData.value;
  editableUser.pop();
};
const open = async (index: number, e: MouseEvent) => {
  await getHeight(e).then(() => {
    show.value === null ? (show.value = index) : (show.value = null);
  });
};
const filterByColumn = () => {
  const filterCol = object.removeBy(col, "");
  let filterData = getCurrentUsers();
  if (Object.entries(filterCol).length >= 1) {
    filterData = array.filter(getCurrentUsers(), filterCol);
  }
  paginateData(filterData);
};
const getAllEmployees = () => {};
const paginateUsers = () => {
  if (searchInput.value.length >= 3) {
    searchInvestment.value = array.search(investmentsData.value,searchInput.value);
    paginateData(searchInvestment.value);
  } else {
    searchInvestment.value = [];
    paginateData(investmentsData.value);
    col = {
      id: null,
  payment_for: "",
  amount_invested: null,
  payment_date: "",
  due_date: "",
  status: "",
    };
  }
};
const paginateData = (data: any) => {
  filteredInvestment.value = array.paginate(
    data,
    currentPage.value,
    currentInvestment.value
  );
  totalPages.value = array.pages(data, currentInvestment.value);
};
const paginateEvent = (page: number) => {
  currentPage.value = page;
  paginateUsers();
};

const searchEvent = () => {
  currentPage.value = 1;
  paginateUsers();
};

const getCurrentUsers = () => {
  return searchInvestment.value.length <= 0 ? investmentsData.value : searchInvestment.value;
};

const sortByColumn = (column) => {
  col = {
    id: null,
  payment_for: "",
  amount_invested: null,
  payment_date: "",
  due_date: "",
  status: "",
  };
  let sortedUsers = getCurrentUsers();
  let sortedColumn = sortCol[column];
  if (sortedColumn === "" || sortedColumn === null) {
    sortCol[column] = "asc";
    sortedUsers = array.sortBy(getCurrentUsers(), column, "asc");
  } else if (sortedColumn === "asc") {
    sortCol[column] = "desc";
    sortedUsers = array.sortBy(getCurrentUsers(), column, "desc");
  } else if (sortedColumn === "desc") {
    sortCol[column] = "";
  }
  paginateData(sortedUsers);
};

const toggleModal = () => {
  showModal.value = !showModal.value;
  editableUser.pop()
};

// const print = () => file.printed(investmentsData.value);
const exportFile = (format) => {
  const genString = file.exported(investmentsData.value, format);
  file.download(genString, format);
};
// methods------------------------------------------------------------------------------

// computed
const showInfo = computed(() => {
  // const getCurrentEntries = getCurrentEntries()
  return array.pageInfo(getCurrentUsers(), currentPage.value, currentInvestment.value);
});
const tableHeader = computed<TableHeader[]>(() => {
  return columns;
});
const tableData = computed<InvestmentTableData[]>(() => {
  return filteredInvestment.value || [];
});

const showPagination = computed(() => {
  let stringArray = array.pagination(totalPages.value, currentPage.value, 3);
  const formatedArray = stringArray.map((str) => {
    return Number(str);
  });
  return formatedArray;
});
let classObject = computed(() => {
  let top: string = `${topPos.value}px`;
  let left: string = `${leftPos.value}px`;
  return {
    top,
    left,
  };
});

// computed------------------------------------------------------------------------------

// lifecycle
onMounted(() => {
  paginateData(investmentsData.value);
  
});
// lifecycle----------------------------------------------------------------------------------



</script>
<template>
  <div class="h-auto">
    <div class="table-form">
      <div class="flex mb-3 justify-between">
        <div class="flex items-center">
          <span class="mr-1">Show</span>
          <select v-model="currentInvestment" @change="paginateUsers" class="p-2 bg-blue-300 bg-opacity-25 rounded-md">
            <option :value="users" v-for="(users, i) in showInvestment" :key="i" class="text-white">
              {{ users }}
            </option>
          </select>
          <span class="ml-1">investments</span>
        </div>
        <div class="formaters">
          <div class="print-options flex justify-end mb-3">
            <!-- <div class="flex items-center border cursor-pointer border-brand-light-blue text-brand-light-blue px-4 py-2 rounded-md mr-3" @click="print" > <i-system-uicons-printer/> Print </div> -->
            <div class="flex items-center border cursor-pointer border-brand-light-blue text-brand-light-blue px-4 py-2 rounded-md" @click="exportFile('csv')" > <i-ion-download /> Export </div>
          </div>
          <div class="search-component w-80 mb-3">
            <div
              class="app-search-bar rounded-lg border border-[#D0D5DD] flex w-full h-11 px-4 py-2"
            >
              <input
                type="search"
                class="placeholder-gray-500 w-full bg-transparent text-base font-normal text-gray-500 outline-none focus:border-none"
                placeholder="Search"
                v-model="searchInput"
                @keyup="searchEvent"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="overflow-x-scroll lg:overflow-x-hidden">
          <div class="py-2 align-middle inline-block min-w-full">
            <div class="overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-transparent">
                  <tr>
                    <th
                    v-for="(headers, i) in tableHeader"
                    :key="i"
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-bold text-brand-ash uppercase tracking-wider"
                    >
                      <div class="flex items-center">
                        <span>{{ headers.text }}</span>
                        <span @click.prevent="sortByColumn(headers.name)" class="cursor-pointer pl-1">
                          <i-mdi-filter-variant class="pointer-events-none" />
                        </span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-bold text-brand-ash uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="(investments, index) in tableData" :key="index" @contextmenu.prevent="selectRow(investments)" class="hover:bg-gray-300 cursor-pointer">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="">
                          <p>#{{ investments.id }}</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 truncate whitespace-nowrap">
                      <div class="text-sm truncate text-ellipsis">{{ investments.payment_for }} Investment</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm">{{ investments.amount_invested }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                      {{ investments.payment_date }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                      {{ investments.due_date }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        :class="
                          investments.status === 'Cancelled'
                            ? 'text-brand-red' : investments.status === 'Pending' ? 'text-yellow-400'
                            : 'text-brand-green'
                        "
                        class="text-sm flex"
                        ><i-mdi-music-note-whole /> {{ investments.status }}</span
                      >
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap relative">
                      <i-mdi-dots-horizontal @click="open(index,$event)" class="cursor-pointer" role="button"
                        aria-label="option" />
                      <div v-if="show === index" :style="classObject" class="fixed z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow-xl">
                        <ul class="py-1" >
                            <li tabindex="0" href="#" class="block py-2 px-4 text-sm text-black hover:bg-gray-100 cursor-pointer" @click="investmentsData[index].status = 'success',open(index,$event)">Approve payment</li>
                            <li tabindex="0" href="#" class="block py-2 px-4 text-sm text-black hover:bg-gray-100 cursor-pointer" @click="investmentsData[index].status = 'pending',open(index,$event)">Cancel payment</li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div
                class="py-3 px-6 table-controls h-full w-full items-center justify-between border border-t-gray-200"
              >
                <div class="table-control-cycle flex">
                  <button
                    @click.prevent="(currentPage = 1), paginateUsers()"
                    :class="[
                      'table-control previous border border-gray-300 rounded-md py-2 px-4 mr-3 text-black text-sm font-medium',
                      {
                        'text-gray-300 pointer-events-none': currentPage === 1,
                      },
                    ]"
                  >
                    First
                  </button>
                  <button
                    :class="[
                      'table-control previous border border-gray-300 rounded-md py-2 px-4 mr-3 text-black text-sm font-medium',
                      {
                        'text-gray-300 pointer-events-none': currentPage === 1,
                      },
                    ]"
                    @click.prevent="
                      currentPage < 1 ? (currentPage = 1) : (currentPage -= 1),
                        paginateUsers()
                    "
                  >
                    Previous
                  </button>
                  <div class="entries">
                    <ul class="inline-flex">
                      <li
                        v-for="(pagination, i) in showPagination"
                        :key="i"
                        :class="[
                          'p-1 px-2 border border-gray-300 rounded-sm',
                          { 'text-blue-800': pagination === currentPage },
                        ]"
                      >
                        <a
                          href="#"
                          @click.prevent="paginateEvent(pagination)"
                          >{{ isNaN(pagination) ? "..." : pagination }}</a
                        >
                      </li>
                    </ul>
                  </div>
                  <button
                    @click.prevent="
                      currentPage > totalPages
                        ? (currentPage = totalPages)
                        : (currentPage += 1),
                        paginateUsers()
                    "
                    :class="[
                      'table-control next ml-3 border border-gray-300 rounded-md py-2 px-4 text-black text-sm font-medium',
                      {
                        'text-gray-300 pointer-events-none':
                          currentPage === totalPages,
                      },
                    ]"
                  >
                    Next
                  </button>
                  <button
                    @click.prevent="(currentPage = totalPages), paginateUsers()"
                    :class="[
                      'table-control next ml-3 border border-gray-300 rounded-md py-2 px-4 text-black text-sm font-medium',
                      {
                        'text-gray-300 pointer-events-none':
                          currentPage === totalPages,
                      },
                    ]"
                  >
                    Last
                  </button>
                </div>

                <div class="entries my-3">
                  <p
                    class="text-gray-700 text-sm font-normal whitespace-nowrap"
                  >
                    Showing {{ showInfo.from }} to {{ showInfo.to }} of
                    {{ showInfo.of }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- USER MODAL -->
    <div v-if="showModal" class="fixed bg-gray-700 inset-0 z-30 bg-opacity-30 w-full h-full">
      <div class="closemodal p-4 fixed top-3 right-6 bg-white rounded-full cursor-pointer">
        <i-ion-close-round class="text-black text-xl" @click="toggleModal"/>
      </div>
      <div class="bg-white p-10 max-w-lg h-auto z-40 mx-auto mt-20">
        <p class="text-xl font-semibold pb-5">Investment INFO</p>
        <p class="text-lg font-semibold pb-3">USERID: <span class="font-normal text-base">{{editableUser[0].id}}</span></p>
        <p class="text-lg font-semibold pb-3">DESCRIPTION: <span class="font-normal text-base">{{editableUser[0].payment_for}}</span></p>
        <p class="text-lg font-semibold pb-3">AMOUNT INVESTED: <span class="font-normal text-base">{{editableUser[0].amount_invested}}</span></p>
        <p class="text-lg font-semibold pb-3">PAYMENT DATE: <span class="font-normal text-base">{{editableUser[0].payment_date}}</span></p>
        <p class="text-lg font-semibold pb-3">DUE DATE: <span class="font-normal text-base">{{editableUser[0].due_date}}</span></p>
        <p class="text-lg font-semibold">STATUS: <span class="font-normal text-base">{{editableUser[0].status}}</span></p>
      </div>
    </div>
  </div>
</template>

