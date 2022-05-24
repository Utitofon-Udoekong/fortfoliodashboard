<script lang="ts" setup>
import { WithdrawalsTableData, TableHeader } from "~~/utils/types/table";
import { array, file } from "alga-js";
import { computed, onMounted, reactive, ref } from "vue";
import { useUserStore } from "~~/store/userStore";
import {
  collectionGroup,
  getDocs,
  query,
  where,
  writeBatch,
} from "@firebase/firestore";
const store = useUserStore();
const { $db } = useNuxtApp();
const batch = writeBatch($db);
// states
const columns = [
  { name: "traxId", text: "Trax ID" },
  { name: "description", text: "Plan" },
  { name: "amount", text: "Amount" },
  { name: "createdat", text: "Createdat" },
  { name: "paymentMethod", text: "Method" },
  { name: "duration", text: "Duration" },
  { name: "roi", text: "ROI" },
  { name: "status", text: "Status" },
];
let col: WithdrawalsTableData = reactive({
  description: "",
  status: "",
  amount: 0,
  createdat: "",
  currency: "",
  duration: 0,
  roi: 0,
  paymentMethod: "",
  planName: "",
  traxId: "",
});

let sortCol: WithdrawalsTableData = reactive({
  description: "",
  status: "",
  amount: 0,
  createdat: "",
  currency: "",
  duration: 0,
  roi: 0,
  paymentMethod: "",
  planName: "",
  traxId: "",
});
const withdrawalsData = ref<WithdrawalsTableData[]>(store.withdrawals);
let filteredWithdrawals = ref<WithdrawalsTableData[]>([]);
const showWithdrawals = ref<number[]>([5, 10, 15, 20, 30, 50, 100]);
const currentWithdrawals = ref<number>(10);
const searchInput = ref<string>("");
const searchWithdrawals = ref<string[]>([]);
const currentPage = ref<number>(1);
const totalPages = ref<number>(1);
let show = ref<number | null>(null);

const topPos = ref(0);
const leftPos = ref(0);
let editableUser: any[];
let showModal = ref(false);
const showError = ref(false);
const showSuccess = ref(false);
const notificationMessage = ref("");
// states------------------------------------------------------------------------------

// methods
const toggleModal = () => {
  showModal.value = !showModal.value;
  editableUser.pop();
};
const selectRow = (traxId: string) => {
  const withdrawalData = store.withdrawals.filter(
    (data) => data.traxId === traxId
  );
  editableUser.push(withdrawalData);
  showModal.value = true;
};

const getHeight = async (e: MouseEvent) => {
  topPos.value = e.pageY + 20;
  leftPos.value = e.pageX - 120;
};

const approveWithdrawal = async (traxId: string) => {
  const ref = query(
    collectionGroup($db, "withdrawals"),
    where("traxId", "==", traxId)
  );
  const notref = query(
    collectionGroup($db, "withdrawals"),
    where("traxId", "==", traxId)
  );
  const querySnapshot = await getDocs(ref);
  const notSnapshot = await getDocs(notref);
  try {
    querySnapshot.forEach((doc) => {
      batch.update(doc.ref, {
        status: "Successful",
      });
    });
    notSnapshot.forEach((doc) => {
      batch.update(doc.ref, {
        status: "Successful",
      });
    });
    await batch.commit().then(
      () => {
        notificationMessage.value = `Withdrawal for ${traxId} approved`;
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
const cancelWithdrawal = async (traxId: string) => {
  const ref = query(
    collectionGroup($db, "withdrawals"),
    where("traxId", "==", traxId)
  );
  const querySnapshot = await getDocs(ref);
  const notref = query(
    collectionGroup($db, "withdrawals"),
    where("traxId", "==", traxId)
  );
  const notSnapshot = await getDocs(notref);
  try {
    querySnapshot.forEach((doc) => {
      batch.update(doc.ref, {
        status: "Cancelled",
      });
    });
    notSnapshot.forEach((doc) => {
      batch.update(doc.ref, {
        status: "Cancelled",
      });
    });
    await batch.commit().then(
      () => {
        notificationMessage.value = `Withdrawal for ${traxId} cancelled`;
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
const open = async (index: number, e: MouseEvent) => {
  await getHeight(e).then(() => {
    show.value === null ? (show.value = index) : (show.value = null);
  });
};

const paginateUsers = () => {
  if (searchInput.value.length >= 3) {
    searchWithdrawals.value = array.search(
      withdrawalsData.value,
      searchInput.value
    );
    paginateData(searchWithdrawals.value);
  } else {
    searchWithdrawals.value = [];
    paginateData(withdrawalsData.value);
    col = {
      description: "",
      status: "",
      amount: 0,
      createdat: "",
      currency: "",
      duration: 0,
      roi: 0,
      paymentMethod: "",
      planName: "",
      traxId: "",
    };
  }
};
const paginateData = (data: any) => {
  filteredWithdrawals.value = array.paginate(
    data,
    currentPage.value,
    currentWithdrawals.value
  );
  totalPages.value = array.pages(data, currentWithdrawals.value);
};
const paginateEvent = (page: number) => {
  currentPage.value = page;
  paginateUsers();
};

const searchEvent = () => {
  currentPage.value = 1;
  paginateUsers();
};

const getCurrentWithdrawals = () => {
  return searchWithdrawals.value.length <= 0
    ? withdrawalsData.value
    : searchWithdrawals.value;
};

const sortByColumn = (column) => {
  col = {
    description: "",
    status: "",
    amount: 0,
    createdat: "",
    currency: "",
    duration: 0,
    roi: 0,
    paymentMethod: "",
    planName: "",
    traxId: "",
  };
  let sortedUsers = getCurrentWithdrawals();
  let sortedColumn = sortCol[column];
  if (sortedColumn === "" || sortedColumn === null) {
    sortCol[column] = "asc";
    sortedUsers = array.sortBy(getCurrentWithdrawals(), column, "asc");
  } else if (sortedColumn === "asc") {
    sortCol[column] = "desc";
    sortedUsers = array.sortBy(getCurrentWithdrawals(), column, "desc");
  } else if (sortedColumn === "desc") {
    sortCol[column] = "";
  }
  paginateData(sortedUsers);
};
// const print = () => file.printed(withdrawalsData.value);
const exportFile = (format: string) => {
  const genString = file.exported(withdrawalsData.value, format);
  file.download(genString, format);
};
// methods------------------------------------------------------------------------------

// computed
const showInfo = computed(() => {
  // const getCurrentEntries = getCurrentEntries()
  return array.pageInfo(
    getCurrentWithdrawals(),
    currentPage.value,
    currentWithdrawals.value
  );
});
const tableHeader = computed<TableHeader[]>(() => {
  return columns;
});
const tableData = computed<WithdrawalsTableData[]>(() => {
  return filteredWithdrawals.value || [];
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
  if(withdrawalsData.value.length > 0){
    paginateData(withdrawalsData.value);
  }
});
// lifecycle---------------------
</script>
<template>
  <div class="h-auto mt-4">
    <div class="table-form">
      <div class="flex mb-3 justify-between">
        <div class="flex items-center">
          <span class="mr-1">Show</span>
          <select
            v-model="currentWithdrawals"
            @change="paginateUsers"
            class="p-2 bg-blue-300 bg-opacity-25 rounded-md"
          >
            <option
              :value="users"
              v-for="(users, i) in showWithdrawals"
              :key="i"
              class="text-white"
            >
              {{ users }}
            </option>
            <option :value="showInfo.of" class="text-white">All</option>
          </select>
          <span class="ml-1">withdrawals</span>
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
              <table
                class="min-w-full divide-y divide-gray-200"
                v-if="withdrawalData.length > 0"
              >
                <caption class="text-lg font-semibold">
                  Recent Withdrawals
                </caption>
                <thead class="bg-white">
                  <tr>
                    <th
                      v-for="(headers, i) in tableHeader"
                      :key="i"
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-bold text-brand-ash uppercase tracking-wider"
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
                    @click="selectRow(data)"
                    class="hover:bg-gray-300 cursor-pointer"
                  >
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div>#{{ data.traxId }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="">
                          <div class="text-sm">{{ data.description }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm">
                        {{ data.currency }}{{ data.amount.toLocaleString() }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                      {{ data.createdat.toLocaleDateString("en-GB") }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                      {{ data.paymentMethod }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                      {{ data.duration }} months
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                      {{ data.roi }}%
                    </td>

                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        :class="
                          data.status === 'Cancelled'
                            ? 'text-brand-red'
                            : data.status === 'Pending'
                            ? 'text-yellow-400'
                            : 'text-brand-green'
                        "
                        class="text-sm flex"
                        ><i-mdi-music-note-whole /> {{ data.status }}</span
                      >
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap relative">
                      <i-ic-baseline-arrow-forward-ios
                        class="text-gray-400 cursor-pointer border border-gray-400 p-1 rounded-full w-auto"
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
                            @click="selectRow(data.traxId)"
                          >
                            Quick View
                          </li>
                          <li
                            tabindex="0"
                            href="#"
                            class="block py-2 px-4 text-sm text-black hover:bg-gray-100 cursor-pointer"
                            @click="
                              approveWithdrawal(data.traxId),
                                open(index, $event)
                            "
                          >
                            Approve withdrawal
                          </li>
                          <li
                            tabindex="0"
                            href="#"
                            class="block py-2 px-4 text-sm text-black hover:bg-gray-100 cursor-pointer"
                            @click="
                              cancelWithdrawal(data.traxId), open(index, $event)
                            "
                          >
                            Cancel withdrawal
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="bg-white p-5 w-full" v-else>
                <p class="text-2xl text-center">NO WITHDRAWAL REQUESTS</p>
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
      v-if="showModal"
      class="fixed bg-gray-700 inset-0 z-30 bg-opacity-30 h-screen w-screen flex justify-center items-center"
    >
      <div
        class="bg-white p-10 max-w-xl h-3/4 z-40 relative rounded-md ring-4 ring-blue-400"
      >
        <i-ion-close-round
          class="text-black text-2xl absolute right-2 top-4 cursor-pointer"
          @click="toggleModal"
        />
        <div class="con w-full h-full">
          <p class="text-xl font-semibold pb-5">Withdrawal INFO</p>
          <p class="text-lg font-semibold pb-3">
            WITHDRAWAL ID:
            <span class="font-normal text-base">{{
              editableUser[0].traxId
            }}</span>
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
            CREATED AT:
            <span class="font-normal text-base">{{
              formatter(editableUser[0].createdat)
            }}</span>
          </p>
          <p class="text-lg font-semibold pb-3">
            PAYMENT METHOD:
            <span class="font-normal text-base">
              {{ editableUser[0].paymentMethod }}
            </span>
          </p>
          <p class="text-lg font-semibold pb-3">
            BANK NAME:
            <span class="font-normal text-base">
              {{ editableUser[0].withdrawalDetails.bankName }}
            </span>
          </p>
          <p class="text-lg font-semibold pb-3">
            ACCOUNT NUMBER:
            <span class="font-normal text-base">
              {{ editableUser[0].withdrawalDetails.accountNumber }}
            </span>
          </p>
          <p class="text-lg font-semibold pb-3">
            USERNAME:
            <span class="font-normal text-base">
              {{ editableUser[0].withdrawalDetails.userName }}
            </span>
          </p>
          <p class="text-lg font-semibold pb-3">
            ACCOUNT ID:
            <span class="font-normal text-base">
              {{ editableUser[0].withdrawalDetails.id }}
            </span>
          </p>
          <p class="text-lg font-semibold pb-3">
            ACCOUNT TYPE:
            <span class="font-normal text-base">
              {{ editableUser[0].withdrawalDetails.type }}
            </span>
          </p>
          <p class="text-lg font-semibold pb-3">
            DURATION:
            <span class="font-normal text-base"
              >{{ editableUser[0].duration }} months</span
            >
          </p>
          <p class="text-lg font-semibold pb-3">
            ROI:
            <span class="font-normal text-base"
              >{{ editableUser[0].roi }}%</span
            >
          </p>
          <span class="font-semibold mb-4 flex flex-col">
            <p class="text-lg font-semibold pb-3">STATUS:</p>
            <span
              class="font-semibold text-lg px-12 text-center rounded py-1 w-1/4 bg-opacity-25"
              :class="
                editableUser[0].status === 'Successful'
                  ? 'text-brand-green bg-brand-green'
                  : editableUser[0].status === 'Cancelled'
                  ? 'text-brand-red bg-brand-red'
                  : 'text-yellow-400 bg-yellow-400'
              "
              >{{ editableUser[0].status }}</span
            >
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
