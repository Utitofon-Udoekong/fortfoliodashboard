<script setup>
const emits = defineEmits(["fileChange"])
const onFileChange = async (e) => {
    var files = e.target.files || e.dataTransfer.files
    if(!files.length) return
    const {snapshot, downloadUrl, metadata} = await uploadFile(files[0])
    emits("fileChange",snapshot, downloadUrl, metadata)
}
</script>
<template>
<div class="mb-4 flex justify-center">
    <input type="file" @change="onFileChange">
    <label class="file-label">
        <span>
            <i-mdi-upload/>
        </span>
        <span>Upload</span>
    </label>
</div>
</template>
<style>
</style>