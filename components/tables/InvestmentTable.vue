<script lang="ts" setup>
// import { investments } from "~~/assets/investments";
import { InvestmentTableData, TableHeader } from "~~/utils/types/table";
import { array, file } from "alga-js";
import { useUserStore } from "~~/store/users";
import {
  collectionGroup,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  writeBatch,
} from "@firebase/firestore";
import formatter from "~~/helpers/formatIsoDate";
const store = useUserStore();
const { $db } = useNuxtApp();
const batch = writeBatch($db);

// states
const columns = [
  { name: "uid", text: "User ID" },
  { name: "description", text: "Payment For" },
  { name: "amount", text: "Amount Invested" },
  { name: "paymentMethod", text: "Method" },
  { name: "paymentDate", text: "Payment Date" },
  { name: "dueDate", text: "Due Date" },
  { name: "duration", text: "Duration" },
  { name: "status", text: "Status" },
];
let col: InvestmentTableData = reactive({
  uid: "",
  description: "",
  amount: 0,
  paymentDate: "",
  dueDate: "",
  status: "",
  paymentMethod: "",
  duration: 0,
});
let sortCol: InvestmentTableData = reactive({
  uid: "",
  description: "",
  amount: 0,
  paymentDate: "",
  dueDate: "",
  status: "",
  paymentMethod: "",
  duration: 0,
});
const investmentsData = ref<InvestmentTableData[]>(store.investments);
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
// states------------------------------------------------------------------------------

// methods

const cancelInvestment = async (uid: string) => {
  const ref = query(
    collectionGroup($db, "investments"),
    where("uid", "==", uid)
  );
  const querySnapshot = await getDocs(ref);
  querySnapshot.forEach((doc) => {
    batch.update(doc.ref, { 
      "status": "Cancelled"
    })
  });
  await batch.commit()
};

const approveInvestment = async (uid: string) => {
  const ref = query(
    collectionGroup($db, "investments"),
    where("uid", "==", uid)
  );
  const querySnapshot = await getDocs(ref);
  querySnapshot.forEach((doc) => {
    batch.update(doc.ref, { 
      "status": "Successful"
    })
  });
  await batch.commit()
};

const selectRow = (user: InvestmentTableData) => {
  editableUser.push(user);
  showUserData.value = true;
};
const toggleTabs = (toggleNumber: number) => (openTab.value = toggleNumber);

const getHeight = async (e: MouseEvent) => {
  topPos.value = e.pageY + 20;
  leftPos.value = e.pageX - 120;
};
const toggleUserData = () => {
  showUserData.value = !showUserData.value;
  editableUser.length = 0;
};
const open = async (index: number, e: MouseEvent) => {
  await getHeight(e).then(() => {
    show.value === null ? (show.value = index) : (show.value = null);
  });
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
      paymentDate: "",
      dueDate: "",
      status: "",
      paymentMethod: "",
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
    paymentDate: "",
    dueDate: "",
    status: "",
    paymentMethod: "",
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

// const print = () => file.printed(investmentsData.value);
const exportFile = (format: string) => {
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

const get3MonthsFortDollarInvestment = computed(() => {
  const descrip = investmentsData.value.filter(
    (investment) => investment.description === "FortDollar Investment"
  );
  const _3months = descrip.filter((data) => data.duration === 3);
  return (_3months.length / investmentsData.value.length) * 100 ?? 0;
});
const get6MonthsFortDollarInvestment = computed(() => {
  const descrip = investmentsData.value.filter(
    (investment) => investment.description === "FortDollar Investment"
  );
  const _6months = descrip.filter((data) => data.duration === 6);
  return (_6months.length / investmentsData.value.length) * 100 ?? 0;
});
const get12MonthsFortDollarInvestment = computed(() => {
  const descrip = investmentsData.value.filter(
    (investment) => investment.description === "FortDollar Investment"
  );
  const _12months = descrip.filter((data) => data.duration === 12);
  return (_12months.length / investmentsData.value.length) * 100 ?? 0;
});
const get3MonthsFortCryptoInvestment = computed(() => {
  const descrip = investmentsData.value.filter(
    (investment) => investment.description === "FortCrypto Investment"
  );
  const _3months = descrip.filter((data) => data.duration === 3);
  return (_3months.length / investmentsData.value.length) * 100 ?? 0;
});
const get6MonthsFortCryptoInvestment = computed(() => {
  const descrip = investmentsData.value.filter(
    (investment) => investment.description === "FortCrypto Investment"
  );
  const _6months = descrip.filter((data) => data.duration === 6);
  return (_6months.length / investmentsData.value.length) * 100 ?? 0;
});
const get12MonthsFortCryptoInvestment = computed(() => {
  const descrip = investmentsData.value.filter(
    (investment) => investment.description === "FortCrypto Investment"
  );
  const _12months = descrip.filter((data) => data.duration === 12);
  return (_12months.length / investmentsData.value.length) * 100 ?? 0;
});
const get3MonthsFortShieldInvestment = computed(() => {
  const descrip = investmentsData.value.filter(
    (investment) => investment.description === "FortShield Investment"
  );
  const _3months = descrip.filter((data) => data.duration === 3);
  return (_3months.length / investmentsData.value.length) * 100 ?? 0;
});
const get6MonthsFortShieldInvestment = computed(() => {
  const descrip = investmentsData.value.filter(
    (investment) => investment.description === "FortShield Investment"
  );
  const _6months = descrip.filter((data) => data.duration === 6);
  return (_6months.length / investmentsData.value.length) * 100 ?? 0;
});
const get12MonthsFortShieldInvestment = computed(() => {
  const descrip = investmentsData.value.filter(
    (investment) => investment.description === "FortShield Investment"
  );
  const _12months = descrip.filter((data) => data.duration === 12);
  return (_12months.length / investmentsData.value.length) * 100 ?? 0;
});

const activeInvestmentAmount = computed(() => {
  const activeInvestments = investmentsData.value.filter(
    (inv) => inv.status === "Successful"
  );
  return activeInvestments.length;
});

const currentMonthsInvestmentAmount = computed(() => {
  const date = new Date();
  const currentMonth = date.getUTCMonth();
  const currentMonthInvestment = investmentsData.value.filter(
    (inv) => new Date(inv.paymentDate).getMonth() === currentMonth
  );
  const totalSum = currentMonthInvestment.reduce((acc, inv) => {
    return acc + inv.amount;
  }, 0);
  // console.log(currentMonthInvestment)
  return totalSum;
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
          <select
            v-model="currentInvestment"
            @change="paginateUsers"
            class="p-2 bg-blue-300 bg-opacity-25 rounded-md"
          >
            <option
              :value="users"
              v-for="(users, i) in showInvestment"
              :key="i"
              class="text-white"
            >
              {{ users }}
            </option>
          </select>
          <span class="ml-1">investments</span>
        </div>
        <div class="formaters">
          <div class="print-options flex justify-end mb-3">
            <!-- <div class="flex items-center border cursor-pointer border-brand-light-blue text-brand-light-blue px-4 py-2 rounded-md mr-3" @click="print" > <i-system-uicons-printer/> Print </div> -->
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
              <table class="min-w-full divide-y divide-gray-200">
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
                <tbody class="bg-white divide-y divide-gray-200">
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
                            @click="selectRow(investments), open(index, $event)"
                          >
                            Quick view
                          </li>
                          <li
                            tabindex="0"
                            href="#"
                            class="block py-2 px-4 text-sm text-black hover:bg-gray-100 cursor-pointer"
                            @click="approveInvestment(investments.uuid),
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
    <div class="py-4">
      <div class="flex gap-4">
        <InvestmentOverview
          :activeInvestmentAmount="activeInvestmentAmount"
          :currentMonthsInvestmentAmount="currentMonthsInvestmentAmount"
        />
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
              <div
                class="relative flex flex-col min-w-0 break-words w-full mb-6 body"
              >
                <div class="px-4 py-5 flex-auto">
                  <div class="tab-content tab-space">
                    <!-- 3 months -->
                    <div
                      :class="{ hidden: openTab !== 1, block: openTab === 1 }"
                    >
                      <div class="fortdollar mb-5">
                        <div
                          class="mb-2 text-sm text-gray-500 flex justify-between items-center"
                        >
                          <p class="">Fortdollar</p>
                          <p>
                            {{ get3MonthsFortDollarInvestment.toFixed(2) }}%
                          </p>
                        </div>

                        <div class="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            class="bg-brand-light-blue h-1.5 rounded-full"
                            :style="{
                              width: get3MonthsFortDollarInvestment + '%',
                            }"
                          ></div>
                        </div>
                      </div>

                      <div class="fortcrypto mb-5">
                        <div
                          class="mb-2 text-sm text-gray-500 flex justify-between items-center"
                        >
                          <p class="">FortCrypto</p>
                          <p>
                            {{ get3MonthsFortCryptoInvestment.toFixed(2) }}%
                          </p>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            class="bg-brand-blue h-1.5 rounded-full"
                            :style="{
                              width: get3MonthsFortCryptoInvestment + '%',
                            }"
                          ></div>
                        </div>
                      </div>

                      <div class="fortshield">
                        <div
                          class="mb-2 text-sm text-gray-500 flex justify-between items-center"
                        >
                          <p class="">FortShield</p>
                          <p>
                            {{ get3MonthsFortDollarInvestment.toFixed(2) }}%
                          </p>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            class="bg-brand-green h-1.5 rounded-full"
                            :style="{
                              width: get3MonthsFortShieldInvestment + '%',
                            }"
                          ></div>
                        </div>
                      </div>
                    </div>
                    <!-- 6 months -->
                    <div
                      :class="{ hidden: openTab !== 2, block: openTab === 2 }"
                    >
                      <div class="fortdollar mb-5">
                        <div
                          class="mb-2 text-sm text-gray-500 flex justify-between items-center"
                        >
                          <p class="">Fortdollar</p>
                          <p>
                            {{ get6MonthsFortDollarInvestment.toFixed(2) }}%
                          </p>
                        </div>

                        <div class="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            class="bg-brand-light-blue h-1.5 rounded-full"
                            :style="{
                              width: get6MonthsFortDollarInvestment + '%',
                            }"
                          ></div>
                        </div>
                      </div>

                      <div class="fortcrypto mb-5">
                        <div
                          class="mb-2 text-sm text-gray-500 flex justify-between items-center"
                        >
                          <p class="">FortCrypto</p>
                          <p>
                            {{ get6MonthsFortCryptoInvestment.toFixed(2) }}%
                          </p>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            class="bg-brand-blue h-1.5 rounded-full"
                            :style="{
                              width: get6MonthsFortCryptoInvestment + '%',
                            }"
                          ></div>
                        </div>
                      </div>

                      <div class="fortshield">
                        <div
                          class="mb-2 text-sm text-gray-500 flex justify-between items-center"
                        >
                          <p class="">FortShield</p>
                          <p>
                            {{ get6MonthsFortShieldInvestment.toFixed(2) }}%
                          </p>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            class="bg-brand-green h-1.5 rounded-full"
                            :style="{
                              width: get6MonthsFortShieldInvestment + '%',
                            }"
                          ></div>
                        </div>
                      </div>
                    </div>
                    <!-- 12 months -->
                    <div
                      :class="{ hidden: openTab !== 3, block: openTab === 3 }"
                    >
                      <div class="fortdollar mb-5">
                        <div
                          class="mb-2 text-sm text-gray-500 flex justify-between items-center"
                        >
                          <p class="">Fortdollar</p>
                          <p>
                            {{ get12MonthsFortDollarInvestment.toFixed(2) }}%
                          </p>
                        </div>

                        <div class="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            class="bg-brand-light-blue h-1.5 rounded-full"
                            :style="{
                              width: get12MonthsFortDollarInvestment + '%',
                            }"
                          ></div>
                        </div>
                      </div>

                      <div class="fortcrypto mb-5">
                        <div
                          class="mb-2 text-sm text-gray-500 flex justify-between items-center"
                        >
                          <p class="">FortCrypto</p>
                          <p>
                            {{ get12MonthsFortCryptoInvestment.toFixed(2) }}%
                          </p>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            class="bg-brand-blue h-1.5 rounded-full"
                            :style="{
                              width: get12MonthsFortCryptoInvestment + '%',
                            }"
                          ></div>
                        </div>
                      </div>

                      <div class="fortshield">
                        <div
                          class="mb-2 text-sm text-gray-500 flex justify-between items-center"
                        >
                          <p class="">FortShield</p>
                          <p>
                            {{ get12MonthsFortShieldInvestment.toFixed(2) }}%
                          </p>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            class="bg-brand-green h-1.5 rounded-full"
                            :style="{
                              width: get12MonthsFortShieldInvestment + '%',
                            }"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="showUserData"
      class="fixed bg-gray-700 inset-0 z-30 bg-opacity-30 h-screen w-screen flex justify-center items-center"
    >
      <div
        class="bg-white p-10 max-w-xl h-3/4 z-40 relative rounded-md ring-4 ring-blue-400"
      >
        <i-ion-close-round
          class="text-black text-2xl absolute right-2 top-4 cursor-pointer"
          @click="toggleUserData"
        />
        <div class="con w-full h-full">
          <p class="text-xl font-semibold pb-5">Investment INFO</p>
          <p class="text-lg font-semibold pb-3">
            INVESTMENT ID:
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
            <span class="font-normal text-base">
              {{ editableUser[0].currency }}
              {{ editableUser[0].amount.toLocaleString() }}
            </span>
          </p>
          <p class="text-lg font-semibold pb-3">
            PAYMENT DATE:
            <span class="font-normal text-base">{{
              formatter(editableUser[0].paymentDate)
            }}</span>
          </p>
          <p class="text-lg font-semibold pb-3">
            DUE DATE:
            <span class="font-normal text-base">{{
              formatter(editableUser[0].dueDate)
            }}</span>
          </p>
          <p class="text-lg font-semibold pb-3">
            PAYMENT METHOD:
            <span class="font-normal text-base">
              {{ editableUser[0].bankAccountType }}
              {{ editableUser[0].paymentMethod }}
            </span>
          </p>
          <p class="text-lg font-semibold pb-3">
            DURATION:
            <span class="font-normal text-base"
              >{{ editableUser[0].duration }} months</span
            >
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
  </div>
</template>
