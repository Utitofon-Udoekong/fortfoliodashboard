<script lang="ts" setup>
    const newsList = [
        "chart",
        "graph",
        "users"
    ]
</script>
<template>
<div class="flex">
    <div class="image w-16 h-16" v-for="(news, index) in newsList" :key="index">
        <PNGImage :path="news" :alt="news" class="w-full h-full object-cover" />
    </div>
</div>
</template>
<style>
</style>