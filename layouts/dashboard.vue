<script setup>
let clamp = ref(false);
const changeClamp = () => clamp.value = !clamp.value;
provide("clamp", {
    clamp,
    changeClamp
})
</script>
<template>
<div class="flex h-screen relative overflow-hidden">
        <Sidebar/>
        <div class="h-full" :class="clamp ? 'w-11/12' : 'w-5/6'">
            <Header />
            <main class="h-5/6 px-5 overflow-y-auto">
                <BaseTitle/>
                <slot/>
            </main>
        </div>
    </div>
</template>
<style>

</style>