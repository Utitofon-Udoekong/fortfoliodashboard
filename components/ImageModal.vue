<script lang="ts" setup>
interface Props{
    show: boolean,
    toggleShow: Function
    imageSource: string
}
const props = defineProps<Props>()
</script>
<template>
    <div class="modal-bg fixed inset-0 h-screen w-screen bg-gray-800 bg-opacity-25 flex justify-center items-center" v-if="props.show" >
        <div class="image-cap max-w-lg h-2/3 bg-white rounded-md overflow-hidden relative border-4 border-white ring-4 ring-blue-500">
            <i-mdi-close class="absolute text-xl text-white bg-black rounded-full right-2 cursor-pointer" @click="props.toggleShow"/>
            <img :src="props.imageSource" class="w-full h-full" alt="KYC_IMAGE" lazy >
        </div>
    </div>
</template>
<style>
</style>