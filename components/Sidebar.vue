<script lang="ts" setup>
const {clamp, changeClamp} = inject("clamp")
</script>
<template>
    <div class="bg-brand-blue h-full w-1/6 p-4" :class="clamp ? 'w-1/12' : 'w-1/6'">
        <div class="header flex justify-between items-center">
            <span>
                <img src="@/assets/images/logo.png" alt="Fortfolio official Logo">
            </span>
            <div :class="clamp ? 'hidden' : 'block'">
                <p class="text-white">Fortfolio</p>
                <p class="text-xs text-white">Admin Dashboard</p>
            </div>
            <i-mdi-menu-close @click="changeClamp" class="text-white text-lg cursor-pointer" />
        </div>
        <hr class="border-none h-px bg-gray-500 my-6">
        <div>
            <ul :class="clamp ? 'flex flex-col items-center' : ''">
                <li class="flex items-center text-gray-300 mb-3 p-2 hover:bg-brand-clear_white cursor-pointer rounded-xl">
                    <span class="pr-3"><i-mdi-home-variant/></span>
                    <NuxtLink :class="clamp ? 'hidden' : 'block' " to="/dashboard">Dashboard</NuxtLink>
                </li>
                <li class="flex items-center text-gray-300 mb-3 p-2 hover:bg-brand-clear_white cursor-pointer rounded-xl">
                    <span class="pr-3"><i-bx-bx-chart/></span>
                    <NuxtLink :class="clamp ? 'hidden' : 'block' " to="/dashboard/investment">Investments</NuxtLink>
                </li>
                <li class="flex items-center text-gray-300 mb-3 p-2 hover:bg-brand-clear_white cursor-pointer rounded-xl">
                    <span class="pr-3"><i-ph-users-three/></span>
                    <NuxtLink :class="clamp ? 'hidden' : 'block' " to="/dashboard/users">Users</NuxtLink>
                </li>
                <li class="flex items-center text-gray-300 mb-3 p-2 hover:bg-brand-clear_white cursor-pointer rounded-xl">
                    <span class="pr-3"><i-ph-shield-check-light/></span>
                    <NuxtLink :class="clamp ? 'hidden' : 'block' " to="/dashboard/kyc">Manage KYC</NuxtLink>
                </li>
                <li class="flex items-center text-gray-300 mb-3 p-2 hover:bg-brand-clear_white cursor-pointer rounded-xl">
                    <span class="pr-3"><i-ph-file-arrow-up/></span>
                    <NuxtLink :class="clamp ? 'hidden' : 'block' " to="/dashboard/transaction"> Transactions</NuxtLink>
                </li>
            </ul>
        </div>
        <!--   -->
    </div>
</template>
