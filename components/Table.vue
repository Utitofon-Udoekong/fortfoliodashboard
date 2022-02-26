<script lang="ts" setup>
import CheckboxComponent from "./CheckboxComponent.vue";
const activities = [
  {
    userID: Math.floor(Math.random() * 121333 + 1234567),
    amount_invested: "50,000",
    description: "FortShield Investment",
    payment_date: new Date().toISOString().substr(0, 10),
    due_date: new Date().toISOString().substr(0, 10),
    time: new Date().toLocaleTimeString(),
    status: "pending",
  },
  {
    userID: Math.floor(Math.random() * 121333 + 1234567),
    amount_invested: "50,000",
    description: "FortShield Investment",
    payment_date: new Date().toISOString().substr(0, 10),
    due_date: new Date().toISOString().substr(0, 10),
    time: new Date().toLocaleTimeString(),
    status: "pending",
  },
];
let show = ref<number | null>(null);
const open = (index: number) => show.value === null ? show.value = index : show.value = null
// const show = () => (isOpen.value = !isOpen.value);
</script>
<template>
  <div class="">
    <div class="table-form">
      <div class="flex flex-col">
        <div class="overflow-x-scroll md:overflow-x-hidden">
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
                      User ID
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-bold text-brand-ash uppercase tracking-wider"
                    >
                      Payment for
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-bold text-brand-ash uppercase tracking-wider"
                    >
                      Amount Invested
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-bold text-brand-ash uppercase tracking-wider"
                    >
                      Payment Date
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-bold text-brand-ash uppercase tracking-wider"
                    >
                      Due date
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
                  <tr v-for="(activity, index) in activities" :key="index">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <CheckboxComponent checked="unchecked" />
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                          <p>#{{ activity.userID }}</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm">{{ activity.description }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm">{{ activity.amount_invested }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                      {{ activity.payment_date }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                      {{ activity.due_date }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        :class="
                          activity.status === 'pending'
                            ? 'text-brand-red'
                            : 'text-brand-green'
                        "
                        class="text-sm flex"
                        ><i-mdi-music-note-whole /> {{ activity.status }}</span
                      >
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap relative">
                      <i-mdi-dots-horizontal @click="open(index)" class="cursor-pointer" role="button"
                        aria-label="option" />
                      <div v-if="show === index" class="fixed right-6 z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow-xl ">
                        <ul class="py-1" >
                            <li tabindex="0" href="#" class="block py-2 px-4 text-sm text-black hover:bg-gray-100 cursor-pointer" @click="activities[index].status = 'success'">Approve payment</li>
                            <li tabindex="0" href="#" class="block py-2 px-4 text-sm text-black hover:bg-gray-100 cursor-pointer">Cancel payment</li>
                        </ul>
                      </div>
                      <!-- <button
                        class="focus:ring-2 rounded-md focus:outline-none"
                        @click="show === null ? (show = index) : (show = null)"
                        role="button"
                        aria-label="option"
                      >
                      </button>
                      <div
                        class="dropdown-content bg-white shadow w-24 absolute z-30 right-0 mr-6"
                        v-if="show === index"
                      >
                        <div
                          tabindex="0"
                          class="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white"
                        >
                          <p>Edit</p>
                        </div>
                        <div
                          tabindex="0"
                          class="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white"
                        >
                          <p>Delete</p>
                        </div>
                      </div> -->
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
<style></style>
