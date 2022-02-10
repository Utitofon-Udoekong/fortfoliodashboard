<template>
<div class="flex h-screen relative">
        <Sidebar/>
        <div class="w-5/6 h-full">
            <Header />
            <main class="h-5/6 px-5">
                <slot/>
            </main>
        </div>
    </div>
</template>
<style>
</style>