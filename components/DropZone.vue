<script lang="ts" setup>
let active = ref(false)
let inActiveTimeout = null

const setActive = () => {
    active.value = true
    clearTimeout(inActiveTimeout)
}
const setInactive = () => {
    inActiveTimeout = setTimeout(() => {
        active.value = false
    }, 50)
}

const emit = defineEmits(['files-dropped'])

const  onDrop = (e: { dataTransfer: { files: any; }; }) => {
    setInactive()
    emit('files-dropped', [...e.dataTransfer.files])
}

const preventDefaults = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
}


const events = ['dragenter', 'dragover', 'dragleave', 'drop']

onMounted(() => {
    events.forEach((eventName) => {
        document.body.addEventListener(eventName, preventDefaults)
    })
})

onUnmounted(() => {
    events.forEach((eventName) => {
        document.body.removeEventListener(eventName, preventDefaults)
    })
})
</script>
<template>
<div :data-active="active" @dragenter.prevent="setActive" @dragover.prevent="setActive" @dragleave.prevent="setInactive" @drop.prevent="onDrop">
        <!-- share state with the scoped slot -->
        <slot :dropZoneActive="active"></slot>
    </div>
</template>
<style>
</style>