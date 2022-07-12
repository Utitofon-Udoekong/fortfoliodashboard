<script lang="ts" setup>
import { TableHeader, UsersTableData } from "~~/utils/types/table";
import { array, file } from "alga-js";
import { useUserStore } from "~~/store/userStore";
import { onSnapshot, collection, query, where, DocumentData } from "firebase/firestore";
import { daysBetween } from "~~/helpers/daysAgo";
// states
const store = useUserStore()
const {$firestore} = useNuxtApp()
const columns = [
  { name: "id", text: "User ID" },
  { name: "firstName", text: "User Name" },
  { name: "email", text: "Email Address" },
  { name: "phoneNumber", text: "Phone Number" },
  { name: "createdat", text: "Created At" },
  { name: "daysLeft", text: "Days Left" },
  { name: "isVerified", text: "Verified" },
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
});

const usersData = ref<UsersTableData[] | DocumentData[]>([]);
const filteredUsers = ref<UsersTableData[]>([]);
const showUsers = ref<number[]>([5, 10, 15, 20, 30, 50, 100]);
const currentUsers = ref<number>(10);
const searchInput = ref<string>("");
const searchUsers = ref<string[]>([]);
const currentPage = ref<number>(1);
const totalPages = ref<number>(1);
const show = ref<number | null>(null);
const showUserData = ref(false);

const topPos = ref(0);
const leftPos = ref(0);
let editableUser: UsersTableData[] = [];
// states------------------------------------------------------------------------------

// methods
const snapUsersData = (snap) => {
  usersData.value.push(snap)
}
const deleteUser = async (id: string) => {
  await store.deleteUser(id)
}
const selectRow = (user: UsersTableData) => {
  editableUser.push(user);
  showUserData.value = true;
};

const getHeight = async (e: MouseEvent) => {
  topPos.value = e.pageY + 20;
  leftPos.value = e.pageX - 120;
  // console.log(top.value, left.value)
};

const open = async (index: number, e: MouseEvent) => {
  await getHeight(e).then(() => {
    show.value === null ? (show.value = index) : (show.value = null);
  });
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
const tableData = computed<UsersTableData[]>(() => {
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

watchEffect(() => {
  const q = query(collection($firestore, "authUsers"), where("status","==", "Deleted"));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        const data = {
          uuid: change.doc.id,
          ...change.doc.data()
        }
          snapUsersData(data);
      }
      if (change.type === "modified") {
        usersData.value = usersData.value.map((x: { id: any; }) => (x.id === change.doc.data()["id"]) ? change.doc.data() : x)
      }
      if (change.type === "removed") {
        usersData.value = usersData.value.filter((x) => x.id != change.doc.data()["id"])
      }
    });
    paginateData(usersData.value)
  });
})

// computed------------------------------------------------------------------------------

// lifecycle
onUnmounted(() => {
  const q = query(collection($firestore, "authUsers"), where("status","==", "Deleted"));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    
  });
  unsubscribe()
});
// lifecycle----------------------------------------------------------------------------------
</script>
<template>
  <div class="h-auto">
    <!-- SHOW USER DATA -->
    <div v-if="showUserData">
      <div
        class="bg-white p-10 pt-14 w-full h-auto relative ring-4 ring-brand-light-blue rounded-md "
      >
        <div
          class="closemodal absolute right-6 top-6 cursor-pointer "
          @click="showUserData = false"
        >
          <i-ion-close-round class="text-black text-xl" />
        </div>
        <div class="w-full grid grid-cols-2 gap-x-8 gap-y-10">
          <span class="flex font-semibold justify-between">
            <p class="text-lg font-semibold text-gray-500 pb-3">First Name:</p>
            <span class="font-semibold text-black text-2xl">{{
              editableUser[0].firstName
            }}</span>
          </span>
          <span class="flex font-semibold justify-between">
            <p class="text-lg font-semibold text-gray-500 pb-3">Last Name:</p>
            <span class="font-semibold text-black text-2xl">{{
              editableUser[0].lastName
            }}</span>
          </span>
          <span class="flex font-semibold justify-between">
            <p class="text-lg font-semibold text-gray-500 pb-3">User ID:</p>
            <span class="font-semibold text-black text-2xl">{{
              editableUser[0].id
            }}</span>
          </span>
          <span class="flex justify-between">
            <p class="text-lg font-semibold text-gray-500 pb-3">
              Email Address:
            </p>
            <span class="font-semibold text-black text-2xl">{{
              editableUser[0].email
            }}</span>
          </span>
          <span class="flex justify-between">
            <p class="text-lg font-semibold text-gray-500 pb-3">
              Phone Number:
            </p>
            <span class="font-semibold text-black text-2xl">{{
              editableUser[0].phoneNumber
            }}</span>
          </span>
          <span class="flex font-semibold justify-between">
            <p class="text-lg font-semibold text-gray-500 pb-3">
              Created at:
            </p>
            <span class="font-semibold text-black text-2xl">{{
              new Date(editableUser[0].createdat._seconds * 1000).toDateString() + ' at ' + new Date(editableUser[0].createdat._seconds * 1000).toLocaleTimeString()
            }}</span>
          </span>
          <span class="flex font-semibold justify-between">
            <p class="text-lg font-semibold text-gray-500">Status:</p>
            <span
              class="font-semibold text-2xl"
              :class="
                editableUser[0].isVerified
                            ? 'text-brand-green'
                            : 'text-brand-red'
              "
              >{{ editableUser[0].isVerified ? "Verified" : "Pending" }}</span
            >
          </span>
        </div>
      </div>
    </div>
    <!-- SHOW TABLE -->
    <div v-else class="table-form">
      <div class="flex mb-3 justify-between items-start">
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
                      <i-tabler-edit/>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr
                    v-for="(data, index) in tableData"
                    :key="index"
                    :class="[ 'hover:bg-gray-300 cursor-pointer',
                    {'bg-[#ffe9ab]': data.status === 'Disabled'} ]"
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
                        {{ data.firstName}} {{ data.lastName}}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm">{{ data.email }}</div>
                    </td>
                    <td class="px-3 py-4 whitespace-nowrap text-sm">
                      {{ data.phoneNumber }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                      {{new Date(data.createdat.seconds * 1000).toDateString() + ' at ' + new Date(data.createdat.seconds * 1000).toLocaleTimeString()}}
                    </td>
                    <td class="px-3 py-4 whitespace-nowrap">
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
                    <td class="px-3 py-4 whitespace-nowrap">
                      {{daysBetween(data.createdat.seconds)}}
                    </td>
                    <td class="pr-3 py-4 whitespace-nowrap relative">
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
                            selectRow(data)
                            "
                          >
                            Quick View
                          </li>
                          <li
                            tabindex="0"
                            href="#"
                            class="block py-2 px-4 text-sm text-black hover:bg-gray-100 cursor-pointer"
                            @click="
                              deleteUser(data.uuid)
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
