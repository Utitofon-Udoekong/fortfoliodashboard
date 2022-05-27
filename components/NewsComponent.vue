<script lang="ts" setup>
    const newsList = ref([
        "chart",
        "graph",
        "users"
    ])
    interface Props {
        newsList: string[]
    }
    const props = defineProps<Props>()
</script>
<template>
<div class="flex">
    <div class="image w-16 h-16 border overflow-hidden border-gray-400 rounded-md relative image-con mx-3" v-for="(news, index) in props.newsList" :key="index">
        <div class="overlay">
            <i-mdi-check class="absolute right-1 top-1 cursor-pointer text-white text-sm "/>
        </div>
        <img :src="props.news" alt="news" lazy>
    </div>
</div>
</template>
<style scoped>
.overlay{
    background: rgba(19, 19, 19, 0.479);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
}
.image-con:hover .overlay{
    display: unset;
}
</style>