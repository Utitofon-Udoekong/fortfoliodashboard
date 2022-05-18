<script lang="ts" setup>
import { IncomingInvestmentTableData, TableHeader } from "~~/utils/types/table";
import { array, file } from "alga-js";
import { useUserStore } from "~~/store/users";
import {
  collectionGroup,
  getDocs,
  query,
  where,
  writeBatch,
} from "@firebase/firestore";
import { daysAhead } from "~~/helpers/daysAgo";
const store = useUserStore();
const { $db } = useNuxtApp();
const batch = writeBatch($db);

// states
const columns = [
  { name: "uid", text: "User ID" },
  { name: "description", text: "Payment For" },
  { name: "amount", text: "Amount Invested" },
  { name: "dueDate", text: "Due Date" },
  { name: "duration", text: "Duration" },
  { name: "status", text: "Status" },
];
let col: IncomingInvestmentTableData = reactive({
  uid: "",
  description: "",
  amount: 0,
  dueDate: "",
  status: "",
  duration: 0,
});
let sortCol: IncomingInvestmentTableData = reactive({
  uid: "",
  description: "",
  amount: 0,
  dueDate: "",
  status: "",
  duration: 0,
});
const in3days = store.investments.filter(
    (inv) => inv.dueDate.slice(0,10)  === daysAhead(3, new Date()).slice(0,10)
  );
const investmentsData = ref<IncomingInvestmentTableData[]>(in3days);
let filteredInvestment = ref<IncomingInvestmentTableData[]>([]);
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
let editableUser: IncomingInvestmentTableData[] = [];
const openTab = ref(1);
let showModal = ref(false);
const showError = ref(false);
const showSuccess = ref(false);
const notificationMessage = ref("");
// states------------------------------------------------------------------------------

// methods

const cancelInvestment = async (uid: string) => {
  const ref = query(
    collectionGroup($db, "investments"),
    where("uid", "==", uid)
  );
  const querySnapshot = await getDocs(ref);
  try {
    querySnapshot.forEach((doc) => {
      batch.update(doc.ref, {
        status: "Cancelled",
      });
    });
    await batch.commit().then(
      () => {
        notificationMessage.value = `Investment for ${uid} cancelled`;
        showSuccess.value = true;
      },
      (d) => {
        notificationMessage.value = `An error occured: ${d}`;
        showError.value = true;
      }
    );
  } catch (error) {
    notificationMessage.value = `An error occured: ${error}`;
    showError.value = true;
  }
};

const approveInvestment = async (uid: string) => {
  const ref = query(
    collectionGroup($db, "investments"),
    where("uid", "==", uid)
  );
  const querySnapshot = await getDocs(ref);
  try {
    querySnapshot.forEach((doc) => {
      batch.update(doc.ref, {
        status: "Successful",
      });
    });
    await batch.commit().then(
      () => {
        notificationMessage.value = `Investment for ${uid} Approved`;
        showSuccess.value = true;
      },
      (d) => {
        notificationMessage.value = `An error occured: ${d}`;
        showError.value = true;
      }
    );
  } catch (error) {
    notificationMessage.value = `An error occured: ${error}`;
    showError.value = true;
  }
};

const selectRow = (user: IncomingInvestmentTableData) => {
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

const filter3days = () => {
  const in3days = investmentsData.value.filter(
    (inv) => inv.dueDate === daysAhead(3, new Date())
  );
  console.log(in3days)
  paginateData(in3days);
};
const filter1Week = () => {
  const in1Week = investmentsData.value.filter(
    (inv) => inv.dueDate === daysAhead(7, new Date())
  );
  console.log(in1Week)
  paginateData(in1Week);
};
const filter2Weeks = () => {
  const in2Weeks = investmentsData.value.filter(
    (inv) => inv.dueDate === daysAhead(14, new Date())
  );
  console.log(in2Weeks)
  paginateData(in2Weeks);
};
const paginateUsers = () => {
  if (searchInput.value.length >= 3) {
    searchInvestment.value = array.search(
      investmentsData.value,
      searchInput.value
    );
    paginateData(searchInvestment.value);
  } else {
    searchInvestment.value = [];
    paginateData(investmentsData.value);
    col = {
      uid: "",
      description: "",
      amount: 0,
      dueDate: "",
      status: "",
      duration: 0,
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
  return searchInvestment.value.length <= 0
    ? investmentsData.value
    : searchInvestment.value;
};

const sortByColumn = (column) => {
  col = {
    uid: "",
    description: "",
    amount: 0,
    dueDate: "",
    status: "",
    duration: 0,
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
  editableUser.pop();
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
  return array.pageInfo(
    getCurrentUsers(),
    currentPage.value,
    currentInvestment.value
  );
});
const tableHeader = computed<TableHeader[]>(() => {
  return columns;
});
const tableData = computed<IncomingInvestmentTableData[]>(() => {
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

watch(showError, (newVal) => {
  if (newVal === true) {
    setTimeout(() => {
      showError.value = false;
    }, 1500);
  }
});

watch(showSuccess, (newVal) => {
  if (newVal === true) {
    setTimeout(() => {
      showSuccess.value = false;
    }, 1500);
  }
});
// computed------------------------------------------------------------------------------

// lifecycle
onMounted(() => {
  paginateData(investmentsData.value);
});
// lifecycle----------------------------------------------------------------------------------
</script>
<template>
<Notifications :showError="showError" :showSuccess="showSuccess" />
  <div class="h-auto">
    <div class="table-form">
      <div class="flex mb-3 justify-between">
        <div class="flex items-center">
          <span class="mr-1">Show</span>
          <select
            v-model="currentInvestment"
            @change="paginateUsers"
            class="p-2  border border-brand-light-blue text-brand-light-blue rounded-md bg-transparent"
          >
            <option
              :value="users"
              v-for="(users, i) in showInvestment"
              :key="i"
              class="text-black"
            >
              {{ users }}
            </option>
          </select>
          <span class="ml-1">investments</span>
        </div>
        <div class="formaters">
          <div class="print-options flex justify-end mb-3">
            <div class="mr-3">
              <select class="p-3 border border-brand-light-blue text-brand-light-blue rounded-md bg-transparent">
              <option @click="filter3days" class="text-black">In 3 days</option>
              <option @click="filter1Week" class="text-black">In 7 days</option>
              <option @click="filter2Weeks" class="text-black"> In 14 days </option>
            </select>
            </div>
            <div class="flex items-center border cursor-pointer border-brand-light-blue text-brand-light-blue px-4 py-2 rounded-md mr-3" @click="print" > <i-system-uicons-printer/> Print </div>
            <div
              class="flex items-center border cursor-pointer border-brand-light-blue text-brand-light-blue px-4 py-2 rounded-md"
              @click="exportFile('csv')"
            >
              <i-ion-download /> Export
            </div>
          </div>
          <div class="search-component w-80 mb-3">
            <div
              class="app-search-bar rounded-lg border border-[#D0D5DD] flex w-full h-11 px-4 py-2 focus-within:border-brand-light-blue"
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
              <table class="min-w-full divide-y divide-gray-200" v-if="investmentsData.length > 0">
                <thead class="bg-transparent">
                  <tr>
                    <th
                      v-for="(headers, i) in tableHeader"
                      :key="i"
                      scope="col"
                      class="mr-3 py-3 text-left text-xs font-bold text-brand-ash uppercase tracking-wider"
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
                <tbody class="bg-white divide-y divide-gray-200"  >
                  <tr
                    v-for="(investments, index) in tableData"
                    :key="index"
                    class="hover:bg-gray-300 cursor-pointer"
                  >
                    <td class="px-6 py-4">
                      <div class="flex items-center">
                        <div class="">
                          <p>#{{ investments.uid }}</p>
                        </div>
                      </div>
                    </td>
                    <td class="py-4 truncate whitespace-nowrap">
                      <div class="text-sm truncate text-ellipsis">
                        {{ investments.description.replace("Investment", "") }}
                      </div>
                    </td>
                    <td class="py-4 whitespace-nowrap">
                      <div class="text-sm">
                        {{ investments.currency }}
                        {{ investments.amount.toLocaleString() }}
                      </div>
                    </td>
                    <td class="py-4 whitespace-nowrap text-sm">
                      {{ investments.bankAccountType }}
                      {{ investments.paymentMethod }}
                    </td>
                    <td class="py-4 text-sm">
                      {{
                        new Date(investments.paymentDate).toLocaleDateString(
                          "en-GB"
                        )
                      }}
                    </td>
                    <td class="py-4 text-sm">
                      {{
                        new Date(investments.dueDate).toLocaleDateString(
                          "en-GB"
                        )
                      }}
                    </td>
                    <td class="py-4 text-sm">
                      {{ investments.duration }} months
                    </td>
                    <td class="py-4 whitespace-nowrap">
                      <span
                        :class="
                          investments.status === 'Cancelled'
                            ? 'text-brand-red'
                            : investments.status === 'Pending'
                            ? 'text-yellow-400'
                            : 'text-brand-green'
                        "
                        class="text-sm flex"
                        ><i-mdi-music-note-whole />
                        {{ investments.status }}</span
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
                              selectRow(investments)
                            "
                          >
                            Quick view
                          </li>
                          <li
                            tabindex="0"
                            href="#"
                            class="block py-2 px-4 text-sm text-black hover:bg-gray-100 cursor-pointer"
                            @click="
                              approveInvestment(investments.uuid),
                                open(index, $event)
                            "
                          >
                            Approve payment
                          </li>
                          <li
                            tabindex="0"
                            href="#"
                            class="block py-2 px-4 text-sm text-black hover:bg-gray-100 cursor-pointer"
                            @click="
                              cancelInvestment(investments.uuid),
                                open(index, $event)
                            "
                          >
                            Cancel payment
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
                <div class="bg-white p-5 w-full" v-else>
                  <p class="text-2xl text-center">NO UPCOMING INVESTMENTS</p>
                </div>
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
    <div
      v-if="showUserData"
      class="fixed bg-gray-700 inset-0 z-30 bg-opacity-30 w-full h-full"
    >
      <div
        class="closemodal p-4 fixed top-3 right-6 bg-white rounded-full cursor-pointer"
      >
        <i-ion-close-round class="text-black text-xl" @click="toggleUserData" />
      </div>
      <div class="bg-white p-10 max-w-lg h-auto z-40 mx-auto mt-20">
        <p class="text-xl font-semibold pb-5">Investment INFO</p>
        <p class="text-lg font-semibold pb-3">
          USERID:
          <span class="font-normal text-base">{{ editableUser[0].uid }}</span>
        </p>
        <p class="text-lg font-semibold pb-3">
          DESCRIPTION:
          <span class="font-normal text-base">{{
            editableUser[0].description
          }}</span>
        </p>
        <p class="text-lg font-semibold pb-3">
          AMOUNT INVESTED:
          <span class="font-normal text-base">{{
            editableUser[0].amount
          }}</span>
        </p>
        <p class="text-lg font-semibold pb-3">
          PAYMENT DATE:
          <span class="font-normal text-base">{{
            editableUser[0].paymentDate
          }}</span>
        </p>
        <p class="text-lg font-semibold pb-3">
          DUE DATE:
          <span class="font-normal text-base">{{
            editableUser[0].dueDate
          }}</span>
        </p>
        <p class="text-lg font-semibold pb-3">
          DURATION:
          <span class="font-normal text-base">{{
            editableUser[0].duration
          }}</span>
        </p>
        <p class="text-lg font-semibold">
          STATUS:
          <span class="font-normal text-base">{{
            editableUser[0].status
          }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
