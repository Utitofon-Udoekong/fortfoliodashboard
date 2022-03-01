<script lang="ts" setup>
import CheckboxComponent from "../CheckboxComponent.vue";
const activities = [
  {
    userID: Math.floor(Math.random() * 121333 + 1234567),
    userName: "Adanna Felix",
    email: "heyada@gmail.com",
    phoneNumber: "+234 786 345 5432",
    verification: "ID & utility bill",
    createdat: new Date().toLocaleTimeString(),
    status: "Disabled",
  },
  {
    userID: Math.floor(Math.random() * 121333 + 1234567),
    userName: "Ezegge onowu",
    email: "mama@abc.mail",
    phoneNumber: "+234 786 345 5432",
    verification: "ID & utility bill",
    createdat: new Date().toLocaleTimeString(),
    status: "Disabled",
  },
];

interface editUser{
  userID: number;
    userName: String;
    email: String;
    phoneNumber: String;
    verification: String;
    createdat: String;
    status: String;
}
let editableUser: editUser[] = []
const selectRow = (user: editUser) => {
  editableUser.push(user)
  showUserData.value = true;
};
let show = ref<number | null>(null);
let showUserData = ref(false)
const toggleUserData = () => {
  showUserData.value = !showUserData.value;
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
    <!-- SHOW USER DATA -->
    <div v-if="showUserData" class="w-full h-full">
      <div class="bg-white p-10 h-auto relative">
        <div class="closemodal absolute right-6 top-6 cursor-pointer" @click="toggleUserData">
          <i-ion-close-round class="text-black text-xl" />
        </div>
        <p class="text-xl font-semibold pb-5">USER INFO</p>
        <p class="text-lg font-semibold pb-3">USERID: <span class="font-normal text-base">{{editableUser[0].userID}}</span></p>
        <p class="text-lg font-semibold pb-3">USERNAME: <span class="font-normal text-base">{{editableUser[0].userName}}</span></p>
        <p class="text-lg font-semibold pb-3">EMAIL ADDRESS: <span class="font-normal text-base">{{editableUser[0].email}}</span></p>
        <p class="text-lg font-semibold pb-3">PHONE NUMBER: <span class="font-normal text-base">{{editableUser[0].phoneNumber}}</span></p>
        <p class="text-lg font-semibold pb-3">VERIFICATION: <span class="font-normal text-base">{{editableUser[0].verification}}</span></p>
        <p class="text-lg font-semibold">STATUS: <span class="font-normal text-base">{{editableUser[0].status}}</span></p>
      </div>
    </div>
    <!-- SHOW TABLE -->
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
                      User ID
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-bold text-brand-ash uppercase tracking-wider"
                    >
                      User Name
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-bold text-brand-ash uppercase tracking-wider"
                    >
                      Email Address
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-bold text-brand-ash uppercase tracking-wider"
                    >
                      Phone Number
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-bold text-brand-ash uppercase tracking-wider"
                    >
                      Verification
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
                      <div class="text-sm">
                        <span class="text-md text-blue-800 font-semibold bg-blue-700 bg-opacity-20 py-2 px-3 rounded-full">AF</span>
                        {{ activity.userName }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm">{{ activity.email }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                      {{ activity.phoneNumber }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                      {{ activity.verification }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        :class="
                          activity.status === 'Active'
                            ? 'text-brand-green': activity.status === 'Deleted' ?
                            'text-brand-red'
                            : 'text-yellow-400'
                        "
                        class="text-sm flex"
                        >{{ activity.status }}</span
                      >
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap relative">
                      <i-mdi-dots-horizontal @click="open(index,$event)" class="cursor-pointer" role="button"
                        aria-label="option" />
                      <div v-if="show === index" :style="classObject" class="fixed z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow-xl">
                        <ul class="py-1" >
                            <li tabindex="0" href="#" class="block py-2 px-4 text-sm text-black hover:bg-gray-100 cursor-pointer" @click="activities[index].status = 'Active',open(index,$event)">Verify User</li>
                            <li tabindex="0" href="#" class="block py-2 px-4 text-sm text-black hover:bg-gray-100 cursor-pointer" @click="activities[index].status = 'Disabaled',open(index,$event)">Disable User</li>
                            <li tabindex="0" href="#" class="block py-2 px-4 text-sm text-black hover:bg-gray-100 cursor-pointer" @click="activities[index].status = 'Deleted',open(index,$event)">Delete User</li>
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

