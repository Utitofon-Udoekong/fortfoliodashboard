<script lang="ts" setup>
let isOpen = ref(false);
const toggleOpen = () => (isOpen.value = !isOpen.value);
const firebaseUser = useFirebaseUser()
</script>
<template>
  <div
    class="bg-white h-1/6 w-full flex justify-between items-center px-4 relative"
  >
    <div class="search-bar w-52 rounded relative">
     <div v-if="firebaseUser">LoggedIn</div>
     <div v-else><NuxtLink to="/login">Login</NuxtLink></div>
    </div>
    <div class="">
      <div
        class="notifications p-3 bg-gray-200 rounded-full relative cursor-pointer"
        @click="toggleOpen"
      >
        <i-jam-bell-f />
        <span
          class="absolute top-4 right-4 inline-block w-2 h-2 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full"
        ></span>
      </div>
    </div>
    <div
      v-if="isOpen"
      class="absolute right-4 top-full mt-2 bg-white rounded-md shadow-lg overflow-hidden z-20"
    >
      <div class="py-2">
        <a href="#" class="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2" >
          <p class="text-gray-600 text-sm mx-2">
            <span class="font-bold" href="#">Sara Salah</span> replied on the
            <span class="font-bold text-blue-500" href="#">Upload Image</span>
            artical . 2m
          </p>
        </a>
        <a href="#" class="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2" >
          <p class="text-gray-600 text-sm mx-2">
            <span class="font-bold" href="#">Slick Net</span> start following
            you . 45m
          </p>
        </a>
        <a href="#" class="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2" >
          <p class="text-gray-600 text-sm mx-2">
            <span class="font-bold" href="#">Jane Doe</span> Like Your reply on
            <span class="font-bold text-blue-500" href="#">Test with TDD</span>
            artical . 1h
          </p>
        </a>
        <a href="#" class="flex items-center px-4 py-3 hover:bg-gray-100 -mx-2">
          <p class="text-gray-600 text-sm mx-2">
            <span class="font-bold" href="#">Abigail Bennett</span> start
            following you . 3h
          </p>
        </a>
      </div>
      <a href="#" class="block bg-gray-800 text-white text-center font-bold py-2" >
        See all notifications</a>
    </div>
  </div>
</template>
<style></style>
