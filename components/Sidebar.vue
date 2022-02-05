<script lang="ts">
</script>
<template>
    <div class="bg-brand-blue h-full w-1/6 p-4">
        <div class="header flex justify-between items-center">
            <span>
                <img src="@/assets/images/logo.png" alt="Fortfolio official Logo">
            </span>
            <div class="">
                <p class="text-white">Fortfolio</p>
                <p class="text-xs text-white">Admin Dashboard</p>
            </div>
            <i-mdi-menu-close class="text-white text-lg cursor-pointer" />
        </div>
        <hr class="border-none h-px bg-gray-500 my-6">
        <div>
            <ul>
                <li class="flex items-center text-gray-300 mb-3 p-2 hover:bg-brand-clear_white cursor-pointer rounded-xl">
                    <span class="pr-3"><i-mdi-home-variant/></span>
                    Dashboard
                </li>
                <li class="flex items-center text-gray-300 mb-3 p-2 hover:bg-brand-clear_white cursor-pointer rounded-xl">
                    <span class="pr-3"><i-bx-bx-chart/></span>
                    Investments
                </li>
                <li class="flex items-center text-gray-300 mb-3 p-2 hover:bg-brand-clear_white cursor-pointer rounded-xl">
                    <span class="pr-3"><i-ph-users-three/></span>
                    Users
                </li>
                <li class="flex items-center text-gray-300 mb-3 p-2 hover:bg-brand-clear_white cursor-pointer rounded-xl">
                    <span class="pr-3"><i-ph-shield-check-light/></span>
                    Manage KYC
                </li>
                <li class="flex items-center text-gray-300 mb-3 p-2 hover:bg-brand-clear_white cursor-pointer rounded-xl">
                    <span class="pr-3"><i-ph-file-arrow-up/></span>
                    Transactions
                </li>
            </ul>
        </div>
        <!--   -->
    </div>
</template>
