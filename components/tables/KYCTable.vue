<script lang="ts" setup>
import CheckboxComponent from "../CheckboxComponent.vue";
const activities = [
  {
    userID: Math.floor(Math.random() * 121333 + 1234567),
    amount_invested: "50,000",
    description: "National ID/Utility Bills",
    payment_date: new Date().toISOString().substr(0, 10),
    due_date: new Date().toISOString().substr(0, 10),
    time: new Date().toLocaleTimeString(),
    status: "pending",
  },
  {
    userID: Math.floor(Math.random() * 121333 + 1234567),
    amount_invested: "50,000",
    description: "National ID/Utility Bills",
    payment_date: new Date().toISOString().substr(0, 10),
    due_date: new Date().toISOString().substr(0, 10),
    time: new Date().toLocaleTimeString(),
    status: "pending",
  },
];
interface editUser {
  userID: number;
  amount_invested: String;
  description: String;
  payment_date: String;
  due_date: String;
  time: String;
  status: String;
}
let editableUser: editUser[] = [];
const selectRow = (user: editUser) => {
  editableUser.push(user);
  showModal.value = true;
};
let show = ref<number | null>(null);
let showModal = ref(false);
const toggleModal = () => {
  showModal.value = !showModal.value;
  editableUser.pop();
};
const open = async (index: number, e: MouseEvent) => {
  await getHeight(e).then(() => {
    show.value === null ? (show.value = index) : (show.value = null);
  });
};
const topPos = ref(0);
const leftPos = ref(0);

const getHeight = async (e: MouseEvent) => {
  topPos.value = e.pageY + 20;
  leftPos.value = e.pageX - 120;
  // console.log(top.value, left.value)
};
let classObject = computed(() => {
  let top: string = `${topPos.value}px`;
  let left: string = `${leftPos.value}px`;
  return {
    top,
    left,
  };
});
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
          <span class="flex justify-between"> <p class="text-sm font-semibold text-gray-400 pb-3"> Document Type: </p> <span class="font-normal text-black text-base">{{ editableUser[0].userID }}</span> </span>
          <span class="flex justify-between"> <p class="text-sm font-semibold text-gray-400 pb-3">Frontside:</p> <span class="font-normal text-black text-base">{{ editableUser[0].description }}</span> </span>
          <span class="flex justify-between"> <p class="text-sm font-semibold text-gray-400 pb-3">Back side:</p> <span class="font-normal text-black text-base">{{ editableUser[0].amount_invested }}</span> </span>
          <span class="flex justify-between"> <p class="text-sm font-semibold text-gray-400 pb-3"> Utility Bill: </p> <span class="font-normal text-black text-base">{{ editableUser[0].payment_date }}</span> </span>
          <span class="flex justify-between"> <p class="text-sm font-semibold text-gray-400 pb-3"> Submitted at: </p> <span class="font-normal text-black text-base">{{ editableUser[0].due_date }}</span> </span>
          <span class="flex justify-between"> <p class="text-sm font-semibold text-gray-400">Status:</p> <span class="font-normal text-sm px-12 rounded py-1" :class=" editableUser[0].status === 'Approve' ? 'text-brand-green bg-brand-green bg-opacity-25' : editableUser[0].status === 'Rejected' ? 'text-brand-red bg-brand-red bg-opacity-25' : 'text-yellow-400 bg-yellow-400 bg-opacity-25' " >{{ editableUser[0].status }}</span > </span>
        </div>
      </div>
    </div>
    <div v-else class="table-form">
      <div class="flex flex-col">
        <div class="overflow-x-scroll lg:overflow-x-hidden">
          <div class="py-2 align-middle inline-block min-w-full">
            <div class="overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-transparent">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-bold text-brand-ash uppercase tracking-wider"
                    >
                      <CheckboxComponent checked="checked" />
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-bold text-brand-ash uppercase tracking-wider"
                    >
                      User
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-bold text-brand-ash uppercase tracking-wider"
                    >
                      Document Type
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-bold text-brand-ash uppercase tracking-wider"
                    >
                      Documents
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-bold text-brand-ash uppercase tracking-wider"
                    >
                      Submitted
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-bold text-brand-ash uppercase tracking-wider"
                    >
                      Status
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
                    v-for="(activity, index) in activities"
                    :key="index"
                    @contextmenu.prevent="selectRow(activity)"
                    class="hover:bg-gray-300 cursor-pointer"
                  >
                    <td class="px-6 py-4 whitespace-nowrap">
                      <CheckboxComponent checked="unchecked" />
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <span
                          class="text-md mr-2 text-blue-800 font-semibold bg-blue-700 bg-opacity-20 py-2 px-3 rounded-full"
                          >AF</span
                        >
                        <div class="text-sm font-normal">
                          <p>Esoh mansticks</p>
                          <p>UID{{ activity.userID }}</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm">{{ activity.description }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm">
                        <p>Front side</p>
                        <p>Back side</p>
                        <p>Utility</p>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                      {{ activity.payment_date }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        :class="
                          activity.status === 'Approve'
                            ? 'text-brand-green'
                            : activity.status === 'Rejected'
                            ? 'text-brand-red'
                            : 'text-yellow-500'
                        "
                        class="text-sm flex"
                        ><i-mdi-music-note-whole /> {{ activity.status }}</span
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
                              (activities[index].status = 'Approve'),
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
                              (activities[index].status = 'Rejected'),
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
                              (activities[index].status = 'pending'),
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
