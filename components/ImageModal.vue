<script lang="ts" setup>
const show = ref<boolean>(false)
const toggleShow = () => show.value != show.value
interface Props{
    show: boolean,
    toggleShow: Function
    imageSource: string
}
const props = defineProps<Props>()
</script>
<template>
    <div class="modal-bg fixed inset-0 h-screen w-screen" v-if="props.show" @click="props.toggleShow">
        <div class="image-cap max-w-lg mx-auto my-0 bg-white rounded-md overflow-hidden">
            <img :src="props.imageSource" class="w-full h-auto" alt="KYC_IMAGE">
        </div>
    </div>
</template>
<style>
</style>