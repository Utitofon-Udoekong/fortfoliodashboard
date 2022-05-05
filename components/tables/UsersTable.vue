<script lang="ts" setup>
import { TableHeader } from "~~/utils/types/table";
import { array, file, object } from "alga-js";
// import AdminFunctions from "../../helpers/customFunctions"
const { data } = await useAsyncData("users", () => $fetch("/api/users"));
// states
const columns = [
  { name: "id", text: "User ID" },
  { name: "firstName", text: "User Name" },
  { name: "email", text: "Email Address" },
  { name: "phoneNumber", text: "Phone Number" },
  { name: "createdat", text: "Created At" },
  { name: "isVerified", text: "Status" },
];
let col = reactive({
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  isVerified: false,
  createdat: {},
  balance: 0,
  displayName: "",
  kyc: {},
});
let sortCol = reactive({
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  isVerified: false,
  createdat: {},
  balance: 0,
  displayName: "",
  kyc: {},
});

const usersData = ref<any[]>(data.value);
let filteredUsers = ref<any[]>([]);
const showUsers = ref<number[]>([5, 10, 15, 20, 30, 50, 100]);
const currentUsers = ref<number>(10);
const searchInput = ref<string>("");
const searchUsers = ref<string[]>([]);
const currentPage = ref<number>(1);
const totalPages = ref<number>(1);
let show = ref<number | null>(null);
let showUserData = ref(false);

const topPos = ref(0);
const leftPos = ref(0);
let editableUser: any[] = [];
const openTab = ref(1);
// states------------------------------------------------------------------------------

// methods
const selectRow = (user: any) => {
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
const paginateUsers = () => {
  if (searchInput.value.length >= 3) {
    searchUsers.value = array.search(usersData.value, searchInput.value);
    paginateData(searchUsers.value);
  } else {
    searchUsers.value = [];
    paginateData(usersData.value);
    col = {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      isVerified: false,
      createdat: {},
      balance: 0,
      displayName: "",
      kyc: {},
    };
  }
};
const paginateData = (data: any[]) => {
  filteredUsers.value = array.paginate(
    data,
    currentPage.value,
    currentUsers.value
  );
  totalPages.value = array.pages(data, currentUsers.value);
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
  return searchUsers.value.length <= 0 ? usersData.value : searchUsers.value;
};

const sortByColumn = (column: string) => {
  col = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    isVerified: false,
    createdat: {},
    balance: 0,
    displayName: "",
    kyc: {},
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
// const checks = () => {
//   return Array.from(filteredUsers.value).filter(i => i.checked).map(i => i.id)
// }
const print = () => file.printed(usersData.value);
const exportFile = (format: string) => {
  const genString = file.exported(usersData.value, format);
  file.download(genString, format);
};
// methods------------------------------------------------------------------------------

// computed
const showInfo = computed(() => {
  // const getCurrentEntries = getCurrentEntries()
  return array.pageInfo(
    getCurrentUsers(),
    currentPage.value,
    currentUsers.value
  );
});
const tableHeader = computed<TableHeader[]>(() => {
  return columns;
});
const tableData = computed<any[]>(() => {
  return filteredUsers.value || [];
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
  if(usersData.value.length > 0){
    paginateData(usersData.value);
  }
});
// lifecycle----------------------------------------------------------------------------------
</script>
<template>
  <div class="h-auto">
    <!-- SHOW USER DATA -->
    <div v-if="showUserData" class="w-full h-full">
      <!-- <div class="bg-white p-10 h-auto relative rounded-md">
        <div
          class="closemodal absolute right-6 top-6 cursor-pointer"
          @click="toggleUserData"
        >
          <i-ion-close-round class="text-black text-xl" />
        </div>
        <div class="w-full">
          <p class="title text-xl font-semibold tracking-wider pb-6">
            Customer/
            <span class="text-brand-light-blue">{{
              editableUser[0].userName
            }}</span>
          </p>
          <div class="flex flex-wrap">
            <div class="w-full">
              <div class="headers border-b border-gray-300 mb-4">
                <ul class="flex list-none flex-wrap flex-row -mb-px">
                  <li class="mr-2">
                    <a
                      :class="{
                        'text-gray-500 hover:text-gray-600 border-transparent':
                          openTab !== 1,
                        'text-brand-light-blue border-brand-light-blue':
                          openTab === 1,
                      }"
                      class="inline-block pb-2 px-4 text-sm font-medium text-center rounded-t-lg border-b-2"
                      @click="toggleTabs(1)"
                      href="#"
                    >
                      Personal Information
                    </a>
                  </li>
                  <li class="mr-2">
                    <a
                      :class="{
                        'text-gray-500 hover:text-gray-600 border-transparent':
                          openTab !== 2,
                        'text-brand-light-blue border-brand-light-blue':
                          openTab === 2,
                      }"
                      class="inline-block pb-2 px-4 text-sm font-medium text-center rounded-t-lg border-b-2"
                      @click="toggleTabs(2)"
                      href="#"
                    >
                      Verification
                    </a>
                  </li>
                </ul>
              </div>
              <div
                class="relative flex flex-col min-w-0 break-words w-full body"
              >
                <div class="px-4 py-5 flex-auto">
                  <div class="tab-content tab-space">
                    <div
                      :class="{ hidden: openTab !== 1, block: openTab === 1 }"
                      class="grid grid-cols-2 w-full gap-x-36 gap-y-4"
                    >
                      <span class="flex justify-between">
                        <p class="text-sm font-semibold text-gray-400 pb-3">
                          USERID:
                        </p>
                        <span class="font-normal text-black text-base">{{
                          editableUser[0].id
                        }}</span>
                      </span>
                      <span class="flex justify-between">
                        <p class="text-sm font-semibold text-gray-400 pb-3">
                          USERNAME:
                        </p>
                        <span class="font-normal text-black text-base">{{
                          editableUser[0].userName
                        }}</span>
                      </span>
                      <span class="flex justify-between">
                        <p class="text-sm font-semibold text-gray-400 pb-3">
                          EMAIL ADDRESS:
                        </p>
                        <span class="font-normal text-black text-base">{{
                          editableUser[0].email
                        }}</span>
                      </span>
                      <span class="flex justify-between">
                        <p class="text-sm font-semibold text-gray-400 pb-3">
                          PHONE NUMBER:
                        </p>
                        <span class="font-normal text-black text-base">{{
                          editableUser[0].phone
                        }}</span>
                      </span>
                      <span class="flex justify-between">
                        <p class="text-sm font-semibold text-gray-400 pb-3">
                          VERIFICATION:
                        </p>
                        <span class="font-normal text-black text-base">{{
                          editableUser[0].verification
                        }}</span>
                      </span>
                      <span class="flex justify-between">
                        <p class="text-sm font-semibold text-gray-400">
                          STATUS:
                        </p>
                        <span
                          class="font-normal text-sm px-12 rounded py-1"
                          :class="
                            editableUser[0].status === 'Active'
                              ? 'text-brand-green bg-brand-green bg-opacity-25'
                              : editableUser[0].status === 'Deleted'
                              ? 'text-brand-red bg-brand-red bg-opacity-25'
                              : 'text-yellow-400 bg-yellow-400 bg-opacity-25'
                          "
                          >{{ editableUser[0].status }}</span
                        >
                      </span>
                    </div>
                    <div
                      :class="{ hidden: openTab !== 2, block: openTab === 2 }"
                    >
                      <div
                        class="title text-sm font-semibold text-gray-800 pb-3"
                      >
                        UPLOADED DOCUMENTS
                      </div>
                      <div class="grid grid-cols-2 w-full gap-x-36 gap-y-4">
                        <span class="flex justify-between">
                          <p class="text-sm font-semibold text-gray-400 pb-3">
                            Document Type:
                          </p>
                          <span class="font-normal text-black text-base">{{
                            editableUser[0].id
                          }}</span>
                        </span>
                        <span class="flex justify-between">
                          <p class="text-sm font-semibold text-gray-400 pb-3">
                            Frontside:
                          </p>
                          <span class="font-normal text-black text-base">{{
                            editableUser[0].userName
                          }}</span>
                        </span>
                        <span class="flex justify-between">
                          <p class="text-sm font-semibold text-gray-400 pb-3">
                            Back side:
                          </p>
                          <span class="font-normal text-black text-base">{{
                            editableUser[0].email
                          }}</span>
                        </span>
                        <span class="flex justify-between">
                          <p class="text-sm font-semibold text-gray-400 pb-3">
                            Utility Bill:
                          </p>
                          <span class="font-normal text-black text-base">{{
                            editableUser[0].phone
                          }}</span>
                        </span>
                        <span class="flex justify-between">
                          <p class="text-sm font-semibold text-gray-400 pb-3">
                            Submitted at:
                          </p>
                          <span class="font-normal text-black text-base">{{
                            editableUser[0].verification
                          }}</span>
                        </span>
                        <span class="flex justify-between">
                          <p class="text-sm font-semibold text-gray-400">
                            Status:
                          </p>
                          <span
                            class="font-normal text-sm px-12 rounded py-1"
                            :class="
                              editableUser[0].status === 'Active'
                                ? 'text-brand-green bg-brand-green bg-opacity-25'
                                : editableUser[0].status === 'Deleted'
                                ? 'text-brand-red bg-brand-red bg-opacity-25'
                                : 'text-yellow-400 bg-yellow-400 bg-opacity-25'
                            "
                            >{{ editableUser[0].status }}</span
                          >
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
    <!-- SHOW TABLE -->
    <div class="table-form">
      <div class="flex mb-3 justify-between items-start">
        <!-- <p>{{data}}</p> -->
        <div class="flex items-center">
          <span class="mr-1">Show</span>
          <select
            v-model="currentUsers"
            @change="paginateUsers"
            class="p-2 bg-blue-300 bg-opacity-25 rounded-md"
          >
            <option
              :value="users"
              v-for="(users, i) in showUsers"
              :key="i"
              class="text-white"
            >
              {{ users }}
            </option>
          </select>
          <span class="ml-1">Users</span>
        </div>
        <!-- implement print options -->
        <div class="formaters">
          <div class="print-options flex justify-end mb-3">
            <div
              class="flex items-center border cursor-pointer border-brand-light-blue text-brand-light-blue px-4 py-2 rounded-md mr-3"
              @click="print"
            >
              <i-system-uicons-printer /> Print
            </div>
            <div
              class="flex items-center border cursor-pointer border-brand-light-blue text-brand-light-blue px-4 py-2 rounded-md"
              @click="exportFile('csv')"
            >
              <i-ion-download /> Export
            </div>
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
                      class="px-3 py-3 text-left text-xs font-bold text-brand-ash uppercase tracking-wider"
                    >
                      <div class="flex items-center">
                        <span>{{ headers.text }}</span>
                        <span
                          @click.prevent="sortByColumn(headers.name)"
                          class="cursor-pointer pl-1"
                        >
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
                    v-for="(data, index) in tableData"
                    :key="index"
                    @contextmenu.prevent="selectRow(data)"
                    class="hover:bg-gray-300 cursor-pointer"
                  >
                    <td class="px-3 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="">
                          <p>#{{ data.id }}</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-3 py-4 whitespace-nowrap">
                      <div class="text-sm">
                        <span
                          class="text-md text-blue-800 font-semibold bg-blue-700 bg-opacity-20 py-2 px-3 rounded-full"
                          >{{data.displayName}}</span
                        >
                        {{ data.firstName}}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm">{{ data.email }}</div>
                    </td>
                    <td class="px-3 py-4 whitespace-nowrap text-sm">
                      {{ data.phoneNumber }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                      {{new Date(data.createdat._seconds * 1000).toDateString() + ' at ' + new Date(data.createdat._seconds * 1000).toLocaleTimeString()}}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        :class="
                          data.isVerified
                            ? 'text-brand-green'
                            : 'text-brand-red'
                        "
                        class="text-sm flex"
                        >{{ data.isVerified ? "Verified" : "Pending" }}</span
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
                            // (AdminFunctions.update)
                              // (tableData[index].status = 'Active'),
                                open(index, $event)
                            "
                          >
                            Verify User
                          </li>
                          <li
                            tabindex="0"
                            href="#"
                            class="block py-2 px-4 text-sm text-black hover:bg-gray-100 cursor-pointer"
                            @click="
                              AdminFunctions.disableUser(tableData[index].uuid),
                                open(index, $event)
                            "
                          >
                            Disable User
                          </li>
                          <li
                            tabindex="0"
                            href="#"
                            class="block py-2 px-4 text-sm text-black hover:bg-gray-100 cursor-pointer"
                            @click="
                              (AdminFunctions.deleteUser(tableData[index].uuid)),
                                open(index, $event)
                            "
                          >
                            Delete User
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
