<script lang="ts" setup>
const { clamp, changeClamp } = inject("clamp");
const router = useRouter();
const signOut = async () => {
  await signOutUser().then(() => {
    router.replace("/login");
  });
};
const openUsers = ref(false);
const openInvestment = ref(false);
const toggleUsers = () => (openUsers.value = !openUsers.value);
const toggleInvestment = () => (openInvestment.value = !openInvestment.value);
</script>
<template>
  <div
    class="bg-brand-blue h-screen w-1/6 p-4 overflow-y-auto"
    :class="clamp ? 'w-1/12' : 'w-1/6'"
  >
    <div class="header flex justify-between items-center">
      <NuxtLink to="/">
        <span>
          <img src="@/assets/images/logo.png" alt="Fortfolio official Logo" />
        </span>
      </NuxtLink>
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
        <div class="">
          <p
            @click="toggleInvestment"
            class="flex justify-between items-center text-gray-400 mb-3 p-2 hover:bg-brand-clear_white cursor-pointer rounded-xl"
          >
            <li :class="clamp ? 'hidden' : 'block'">Manage Users</li>
            <span class="pr-3">
              <i-ic-round-keyboard-arrow-up v-if="openInvestment" />
              <i-ic-round-keyboard-arrow-down v-else />
            </span>
          </p>
          <div class="body pl-4" v-if="openInvestment">
            <NuxtLink
              :exact-active-class="'bg-brand-clear_white text-gray-50'"
              class="flex items-center text-gray-400 mb-3 p-2 hover:bg-brand-clear_white cursor-pointer rounded-xl"
              to="/dashboard/users"
            >
              <span class="pr-3"><i-ph-users-three /></span>
              <li :class="clamp ? 'hidden' : 'block'">Users</li>
            </NuxtLink>
            <NuxtLink
              :exact-active-class="'bg-brand-clear_white text-gray-50'"
              class="flex items-center text-gray-400 mb-3 p-2 hover:bg-brand-clear_white cursor-pointer rounded-xl"
              to="/dashboard/users/deleted"
            >
              <span class="pr-3"><i-material-symbols-auto-delete-outline-rounded/></span>
              <li :class="clamp ? 'hidden' : 'block'">Deleted Users</li>
            </NuxtLink>
          </div>
        </div>
        <div class="">
          <p
            @click="toggleInvestment"
            class="flex justify-between items-center text-gray-400 mb-3 p-2 hover:bg-brand-clear_white cursor-pointer rounded-xl"
          >
            <li :class="clamp ? 'hidden' : 'block'">Manage Investments</li>
            <span class="pr-3">
              <i-ic-round-keyboard-arrow-up v-if="openInvestment" />
              <i-ic-round-keyboard-arrow-down v-else />
            </span>
          </p>
          <div class="body pl-4" v-if="openInvestment">
            <NuxtLink
              :exact-active-class="'bg-brand-clear_white text-gray-50'"
              class="flex items-center text-gray-400 mb-3 p-2 hover:bg-brand-clear_white cursor-pointer rounded-xl"
              to="/dashboard/investment"
            >
              <span class="pr-3"><i-ic-round-bar-chart /></span>
              <li :class="clamp ? 'hidden' : 'block'">Investments</li>
            </NuxtLink>
            <NuxtLink
              :exact-active-class="'bg-brand-clear_white text-gray-50'"
              class="flex items-center text-gray-400 mb-3 p-2 hover:bg-brand-clear_white cursor-pointer rounded-xl"
              to="/dashboard/investment/upcoming"
            >
              <span class="pr-3"><i-ic-baseline-area-chart /></span>
              <li :class="clamp ? 'hidden' : 'block'">Upcoming</li>
            </NuxtLink>
          </div>
        </div>
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

        <NuxtLink
          :exact-active-class="'bg-brand-clear_white text-gray-50'"
          to="/dashboard/news"
          class="flex items-center text-gray-400 mb-3 p-2 hover:bg-brand-clear_white cursor-pointer rounded-xl"
        >
          <span class="pr-3"><i-mdi-newspaper /></span>
          <li :class="clamp ? 'hidden' : 'block'">Manage News</li>
        </NuxtLink>
        <NuxtLink
          :exact-active-class="'bg-brand-clear_white text-gray-50'"
          to="/dashboard/logs"
          class="flex items-center text-gray-400 mb-3 p-2 hover:bg-brand-clear_white cursor-pointer rounded-xl"
        >
          <span class="pr-3"><i-mdi-math-log /></span>
          <li :class="clamp ? 'hidden' : 'block'">Logs</li>
        </NuxtLink>
        <p
          @click="signOut"
          class="flex items-center text-gray-400 mb-3 p-2 hover:bg-brand-clear_white cursor-pointer rounded-xl"
        >
          <span class="pr-3"><i-mdi-logout /></span>
          <li :class="clamp ? 'hidden' : 'block'">Signout</li>
        </p>
      </ul>
    </div>
    <!--   -->
  </div>
</template>
