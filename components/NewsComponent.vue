<script lang="ts" setup>
interface Props {
  newsList: string[];
}
const props = defineProps<Props>();
</script>
<template>
  <div class="news grid grid-cols-4 grid-flow-row auto-rows-[minmax(0,_180px)] gap-4 my-4">
    <div
      class="w-full h-auto border overflow-hidden relative border-gray-400 rounded-md mx-3 image-con"
      v-for="(item, index) in props.newsList"
      :key="index"
    > 
      <div class="overlay">
        <i-mdi-delete class="text-white text-3xl"/>
      </div>
      <img :src="item" :alt="`News-${index}`" class="w-full h-full" />
    </div>
  </div>
</template>
<style scoped>
.overlay {
  background: rgba(19, 19, 19, 0.479);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.image-con:hover .overlay {
  display: unset;
}
</style>
