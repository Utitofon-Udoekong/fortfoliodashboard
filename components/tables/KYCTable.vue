<script lang="ts" setup>
import { kycData } from "~~/assets/kyc";
import { KYCTableData, TableHeader } from "~~/utils/types/table";
import { array, file, object } from "alga-js";
import { useUserStore } from "~~/store/users";

const store = useUserStore()

// states
const columns = [
  { name: "fullName", text: "User" },
  { name: "docType", text: "Document Type" },
  { name: "documents", text: "Documents" },
  { name: "submitted", text: "Submitted" },
  { name: "status", text: "Status" },
];
let col = reactive({
  id: null,
  fullName: "",
  docType: "",
  documents: "",
  submitted: "",
  status: "",
});
let sortCol = reactive({
  id: null,
  fullName: "",
  docType: "",
  documents: "",
  submitted: "",
  status: "",
});
const kycDataList = ref<any[]>(store.kyc);
let filteredKYC = ref<any[]>([]);
const showKYC = ref<number[]>([5, 10, 15, 20, 30, 50, 100]);
const currentKYC = ref<number>(10);
const searchInput = ref<string>("");
const searchKYC = ref<string[]>([]);
const currentPage = ref<number>(1);
const totalPages = ref<number>(1);
let show = ref<number | null>(null);
let showKYCData = ref(false);

const topPos = ref(0);
const leftPos = ref(0);
let editableUser: any[] = [];
const openTab = ref(1);
let showModal = ref(false);
// states------------------------------------------------------------------------------

// methods
const toggleModal = () => {
  showModal.value = !showModal.value;
  editableUser.pop();
};
const selectRow = (user) => {
  editableUser.push(user);
  showKYCData.value = true;
};
const toggleTabs = (toggleNumber: number) => (openTab.value = toggleNumber);

const getHeight = async (e: MouseEvent) => {
  topPos.value = e.pageY + 20;
  leftPos.value = e.pageX - 120;
  // console.log(top.value, left.value)
};
const toggleUserData = () => {
  showKYCData.value = !showKYCData.value;
  editableUser.pop();
};
const open = async (index: number, e: MouseEvent) => {
  await getHeight(e).then(() => {
    show.value === null ? (show.value = index) : (show.value = null);
  });
};
const filterByColumn = () => {
  const filterCol = object.removeBy(col, "");
  let filterData = getCurrentKYC();
  if (Object.entries(filterCol).length >= 1) {
    filterData = array.filter(getCurrentKYC(), filterCol);
  }
  paginateData(filterData);
};
const paginateUsers = () => {
  if (searchInput.value.length >= 3) {
    searchKYC.value = array.search(kycDataList.value, searchInput.value);
    paginateData(searchKYC.value);
  } else {
    searchKYC.value = [];
    paginateData(kycDataList.value);
    col = {
      id: null,
  fullName: "",
  docType: "",
  documents: "",
  submitted: "",
  status: "",
    };
  }
};
const paginateData = (data: any) => {
  filteredKYC.value = array.paginate(
    data,
    currentPage.value,
    currentKYC.value
  );
  totalPages.value = array.pages(data, currentKYC.value);
};
const paginateEvent = (page: number) => {
  currentPage.value = page;
  paginateUsers();
};

const searchEvent = () => {
  currentPage.value = 1;
  paginateUsers();
};

const getCurrentKYC = () => {
  return searchKYC.value.length <= 0 ? kycDataList.value : searchKYC.value;
};

const sortByColumn = (column) => {
  col = {
    id: null,
  fullName: "",
  docType: "",
  documents: "",
  submitted: "",
  status: "",
  };
  let sortedUsers = getCurrentKYC();
  let sortedColumn = sortCol[column];
  if (sortedColumn === "") {
    sortCol[column] = "asc";
    sortedUsers = array.sortBy(getCurrentKYC(), column, "asc");
  } else if (sortedColumn === "asc") {
    sortCol[column] = "desc";
    sortedUsers = array.sortBy(getCurrentKYC(), column, "desc");
  } else if (sortedColumn === "desc") {
    sortCol[column] = "";
  }
  paginateData(sortedUsers);
};
// const print = () => file.printed(kycDataList.value);
const exportFile = (format) => {
  const genString = file.exported(kycDataList.value, format);
  file.download(genString, format);
};
// methods------------------------------------------------------------------------------

// computed
const showInfo = computed(() => {
  return array.pageInfo(getCurrentKYC(), currentPage.value, currentKYC.value);
});
const tableHeader = computed<TableHeader[]>(() => {
  return columns;
});
const tableData = computed<any[]>(() => {
  return filteredKYC.value || [];
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
  paginateData(kycDataList.value);
});
// lifecycle---------------------


</script>
<template>
  <div class="h-auto">
    <!-- USER MODAL -->
    <div
      v-if="showModal"
      class="w-full h-full"
    >
      <div class="bg-white p-10 pt-14 w-full h-auto relative rounded-md">
        <div class="closemodal absolute right-6 top-6 cursor-pointer" @click="toggleModal">
            <i-ion-close-round class="text-black text-xl" />
          </div>
        <div class="grid grid-cols-2 w-full gap-x-36 gap-y-4">
          <span class="flex justify-between"> <p class="text-sm font-semibold text-gray-400 pb-3"> Document Type: </p> <span class="font-normal text-black text-base">{{ editableUser[0].id }}</span> </span>
          <span class="flex justify-between"> <p class="text-sm font-semibold text-gray-400 pb-3">Frontside:</p> <span class="font-normal text-black text-base">{{ editableUser[0].fullName }}</span> </span>
          <span class="flex justify-between"> <p class="text-sm font-semibold text-gray-400 pb-3">Back side:</p> <span class="font-normal text-black text-base">{{ editableUser[0].docType }}</span> </span>
          <span class="flex justify-between"> <p class="text-sm font-semibold text-gray-400 pb-3"> Utility Bill: </p> <span class="font-normal text-black text-base">{{ editableUser[0].documents }}</span> </span>
          <span class="flex justify-between"> <p class="text-sm font-semibold text-gray-400 pb-3"> Submitted at: </p> <span class="font-normal text-black text-base">{{ editableUser[0].submitted }}</span> </span>
          <span class="flex justify-between"> <p class="text-sm font-semibold text-gray-400">Status:</p> <span class="font-normal text-sm px-12 rounded py-1" :class=" editableUser[0].status === 'Approve' ? 'text-brand-green bg-brand-green bg-opacity-25' : editableUser[0].status === 'Rejected' ? 'text-brand-red bg-brand-red bg-opacity-25' : 'text-yellow-400 bg-yellow-400 bg-opacity-25' " >{{ editableUser[0].status }}</span > </span>
        </div>
      </div>
    </div>
    <div v-else class="table-form">
      <div class="flex mb-3 justify-between">
        <div class="flex items-center">
          <span class="mr-1">Show</span>
          <select v-model="currentKYC" @change="paginateUsers" class="p-2 bg-blue-300 bg-opacity-25 rounded-md">
            <option :value="users" v-for="(users, i) in showKYC" :key="i" class="text-white">
              {{ users }}
            </option>
          </select>
          <span class="ml-1">Users</span>
        </div>
        <div class="formaters">
          <div class="print-options flex justify-end mb-3">
            <div class="flex items-center border cursor-pointer border-brand-light-blue text-brand-light-blue px-4 py-2 rounded-md mr-3" @click="testPrint" > <i-system-uicons-printer/> Print </div>
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
                  <tr
                    v-for="(kycData, index) in tableData"
                    :key="index"
                    @contextmenu.prevent="selectRow(kycData)"
                    class="hover:bg-gray-300 cursor-pointer"
                  >
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <span
                          class="text-md mr-2 text-blue-800 font-semibold bg-blue-700 bg-opacity-20 py-2 px-3 rounded-full"
                          >{{kycData.fullName.slice(0,1)}}</span
                        >
                        <div class="text-sm font-normal">
                          <p>{{kycData.fullName}}</p>
                          <p>UID{{ kycData.id }}</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm">{{ kycData.docType }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                      {{ kycData.documents }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                      {{ kycData.submitted }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        :class="
                          kycData.status === 'Approve'
                            ? 'text-brand-green'
                            : kycData.status === 'Rejected'
                            ? 'text-brand-red'
                            : 'text-yellow-500'
                        "
                        class="text-sm flex"
                        ><i-mdi-music-note-whole /> {{ kycData.status }}</span
                      >
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap relative">
                      <i-mdi-dots-horizontal
                        @click="open(index, $event)"
                        class="cursor-pointer"
                        role="button"
                        aria-label="option"
                      />
                      <div
                        v-if="show === index"
                        :style="classObject"
                        class="fixed z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow-xl"
                      >
                        <ul class="py-1">
                          <li
                            tabindex="0"
                            href="#"
                            class="block py-2 px-4 text-sm text-black hover:bg-gray-100 cursor-pointer"
                            @click="
                              (kycDataList[index].status = 'Approve'),
                                open(index, $event)
                            "
                          >
                            Approve kyc
                          </li>
                          <li
                            tabindex="0"
                            href="#"
                            class="block py-2 px-4 text-sm text-black hover:bg-gray-100 cursor-pointer"
                            @click="
                              (kycDataList[index].status = 'Rejected'),
                                open(index, $event)
                            "
                          >
                            Reject kyc
                          </li>
                          <li
                            tabindex="0"
                            href="#"
                            class="block py-2 px-4 text-sm text-black hover:bg-gray-100 cursor-pointer"
                            @click="
                              (kycDataList[index].status = 'pending'),
                                open(index, $event)
                            "
                          >
                            Quick view
                          </li>
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
  </div>
</template>
