<script lang="ts" setup>
const { clamp, changeClamp } = inject("clamp");
</script>
<template>
  <div
    class="bg-brand-blue h-full w-1/6 p-4"
    :class="clamp ? 'w-1/12' : 'w-1/6'"
  >
    <div class="header flex justify-between items-center">
      <span>
        <img src="@/assets/images/logo.png" alt="Fortfolio official Logo" />
      </span>
      <div :class="clamp ? 'hidden' : 'block'">
        <p class="text-white">Fortfolio</p>
        <p class="text-xs text-white">Admin Dashboard</p>
      </div>
      <i-mdi-menu-close
        @click="changeClamp"
        class="text-white text-lg cursor-pointer"
      />
    </div>
    <hr class="border-none h-px bg-gray-500 my-6" />
    <div>
      <ul :class="clamp ? 'flex flex-col items-center' : ''">
        <NuxtLink
          :exact-active-class="'bg-brand-clear_white text-gray-50'"
          to="/dashboard"
          class="flex items-center text-gray-400 mb-3 p-2 hover:bg-brand-clear_white cursor-pointer rounded-xl"
        >
          <span class="pr-3"><i-mdi-home-variant /></span>
          <li :class="clamp ? 'hidden' : 'block'">Dashboard</li>
        </NuxtLink>
        <NuxtLink
          :exact-active-class="'bg-brand-clear_white text-gray-50'"
          class="flex items-center text-gray-400 mb-3 p-2 hover:bg-brand-clear_white cursor-pointer rounded-xl"
          to="/dashboard/investment"
        >
          <span class="pr-3"><i-bx-bx-chart /></span>
          <li :class="clamp ? 'hidden' : 'block'">Investments</li>
        </NuxtLink>
        <NuxtLink
          :exact-active-class="'bg-brand-clear_white text-gray-50'"
          class="flex items-center text-gray-400 mb-3 p-2 hover:bg-brand-clear_white cursor-pointer rounded-xl"
          to="/dashboard/investment/upcoming"
        >
          <span class="pr-3"><i-bx-bx-chart /></span>
          <li :class="clamp ? 'hidden' : 'block'">Upcoming Investments</li>
        </NuxtLink>
        <NuxtLink
          :exact-active-class="'bg-brand-clear_white text-gray-50'"
          to="/dashboard/users"
          class="flex items-center text-gray-400 mb-3 p-2 hover:bg-brand-clear_white cursor-pointer rounded-xl"
        >
          <span class="pr-3"><i-ph-users-three /></span>
          <li :class="clamp ? 'hidden' : 'block'">Users</li>
        </NuxtLink>
        <NuxtLink
          :exact-active-class="'bg-brand-clear_white text-gray-50'"
          to="/dashboard/kyc"
          class="flex items-center text-gray-400 mb-3 p-2 hover:bg-brand-clear_white cursor-pointer rounded-xl"
        >
          <span class="pr-3"><i-ph-shield-check-light /></span>
          <li :class="clamp ? 'hidden' : 'block'">Manage KYC</li>
        </NuxtLink>
        <NuxtLink
          :exact-active-class="'bg-brand-clear_white text-gray-50'"
          to="/dashboard/withdrawal"
          class="flex items-center text-gray-400 mb-3 p-2 hover:bg-brand-clear_white cursor-pointer rounded-xl"
        >
          <span class="pr-3"><i-ph-file-arrow-up /></span>
          <li :class="clamp ? 'hidden' : 'block'">Withdrawals</li>
        </NuxtLink>
      </ul>
    </div>
    <!--   -->
  </div>
</template>
