<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
  debug: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="field">
    <div class="label is-normal">
      <label class="label">{{ label }}</label>
    </div>
    <div class="field-body">
      <div class="field border-2 relative focus-within:border-blue-800 hover:border-blue-800 rounded-md">
          <VField class="relative" :name="name" v-slot="{ field, meta, errors }">
            <input
              v-bind="field"
              class="text-md border-2 appearance-none bg-transparent w-full mr-3 py-3 px-2 leading-tight focus:outline-none"
              :class="{
                'border-green-600': meta.valid && meta.touched,
                'border-red-600': !meta.valid && meta.touched,
              }"
              :placeholder="placeholder"
              :type="type"
            />
            <span
              class="absolute right-2 top-1/2 transform -translate-y-1/2"
              v-if="meta.valid && meta.touched"
            >
              <i-ic-baseline-chevron-left/>
            </span>
            <span
              class="absolute right-2 top-1/2 transform -translate-y-1/2"
              v-else-if="!meta.valid && meta.touched"
            >
              <i-ic-baseline-chevron-right/>
            </span>
            
            <VErrorMessage :name="name" as="div" class="help is-danger" />
            <div class="debug" v-if="debug">
              <pre>{{ errors }}</pre>
              <pre>{{ meta }}</pre>
            </div>
          </VField>
      </div>
    </div>
  </div>
</template>



<style></style>
