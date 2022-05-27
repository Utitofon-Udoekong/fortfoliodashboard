<template>
<div class="p-8"><div class="news">
    <DropZone/>
    {{news}}
</div>
<button @click="mama" class="bg-brand-blue text-white mr-3 p-3">get news</button>
<button @click="papa" class="bg-brand-blue text-white mr-3 p-3">print news</button></div>
</template>

<script setup lang="ts">
import { useUserStore } from '~~/store/userStore';

const store = useUserStore()
const news = computed(() => {
    return store.getNews
})
const mama = async () => {
    await store.setNews()
}
const papa = () => {
    console.log(store.getNews)
}
</script>
