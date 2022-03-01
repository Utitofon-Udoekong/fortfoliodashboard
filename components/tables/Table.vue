<script lang="ts" setup>
const activities = [
  {
    userID: Math.floor(Math.random() * 121333 + 1234567),
    amount_invested: "50,000",
    description: "FortShield Investment",
    payment_date: new Date().toISOString().substr(0, 10),
    due_date: new Date().toISOString().substr(0, 10),
    time: new Date().toLocaleTimeString(),
    status: "Pending",
  },
  {
    userID: Math.floor(Math.random() * 121333 + 1234567),
    amount_invested: "50,000",
    description: "FortShield Investment",
    payment_date: new Date().toISOString().substr(0, 10),
    due_date: new Date().toISOString().substr(0, 10),
    time: new Date().toLocaleTimeString(),
    status: "Pending",
  },
];
interface editUser{
  userID: number;
    amount_invested: String;
    description: String;
    payment_date: String;
    due_date: String;
    time: String;
    status: String;
}
let editableUser: editUser[] = []
const selectRow = (user: editUser) => {
  editableUser.push(user)
  showModal.value = true;
};
let show = ref<number | null>(null);
let showModal = ref(false)
const toggleModal = () => {
  showModal.value = !showModal.value;
  editableUser.pop()
};
const open = async (index: number, e: MouseEvent) => {
  await getHeight(e).then(()=>{
    show.value === null ? show.value = index : show.value = null
  })
}
const topPos = ref(0)
const leftPos = ref(0)

const getHeight = async (e: MouseEvent) => {
  topPos.value = e.pageY + 20
  leftPos.value = e.pageX - 120
  // console.log(top.value, left.value)
}
let classObject = computed(() => {
  let top:string = `${topPos.value}px`
  let left:string = `${leftPos.value}px`
  return {
    top,
    left 
  }
})

</script>
<template>
  <div class="h-auto">
    <div class="table-form">
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
                  <tr v-for="(activity, index) in activities" :key="index" @contextmenu.prevent="selectRow(activity)" class="hover:bg-gray-300 cursor-pointer">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <CheckboxComponent checked="unchecked"  />
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="">
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
                          activity.status === 'Cancelled'
                            ? 'text-brand-red' : activity.status === 'Pending' ? 'text-yellow-400'
                            : 'text-brand-green'
                        "
                        class="text-sm flex"
                        ><i-mdi-music-note-whole /> {{ activity.status }}</span
                      >
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap relative">
                      <i-mdi-dots-horizontal @click="open(index,$event)" class="cursor-pointer" role="button"
                        aria-label="option" />
                      <div v-if="show === index" :style="classObject" class="fixed z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow-xl">
                        <ul class="py-1" >
                            <li tabindex="0" href="#" class="block py-2 px-4 text-sm text-black hover:bg-gray-100 cursor-pointer" @click="activities[index].status = 'success',open(index,$event)">Approve payment</li>
                            <li tabindex="0" href="#" class="block py-2 px-4 text-sm text-black hover:bg-gray-100 cursor-pointer" @click="activities[index].status = 'pending',open(index,$event)">Cancel payment</li>
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
    <!-- USER MODAL -->
    <div v-if="showModal" class="fixed bg-gray-700 inset-0 z-30 bg-opacity-30 w-full h-full">
      <div class="closemodal p-4 fixed top-3 right-6 bg-white rounded-full cursor-pointer">
        <i-ion-close-round class="text-black text-xl" @click="toggleModal"/>
      </div>
      <div class="bg-white p-10 max-w-lg h-auto z-40 mx-auto mt-20">
        <p class="text-xl font-semibold pb-5">Investment INFO</p>
        <p class="text-lg font-semibold pb-3">USERID: <span class="font-normal text-base">{{editableUser[0].userID}}</span></p>
        <p class="text-lg font-semibold pb-3">DESCRIPTION: <span class="font-normal text-base">{{editableUser[0].description}}</span></p>
        <p class="text-lg font-semibold pb-3">AMOUNT INVESTED: <span class="font-normal text-base">{{editableUser[0].amount_invested}}</span></p>
        <p class="text-lg font-semibold pb-3">PAYMENT DATE: <span class="font-normal text-base">{{editableUser[0].payment_date}}</span></p>
        <p class="text-lg font-semibold pb-3">DUE DATE: <span class="font-normal text-base">{{editableUser[0].due_date}}</span></p>
        <p class="text-lg font-semibold">STATUS: <span class="font-normal text-base">{{editableUser[0].status}}</span></p>
      </div>
    </div>
  </div>
</template>

