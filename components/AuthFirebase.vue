<template>
    <div class="header w-full bg-brand-blue mb-3">
      <h2 class="text-xl p-2 mb-6 text-center text-white">{{ title }} Admin</h2>
    </div>
    <div class="p-8">
      <div class="formgroup mb-6 flex flex-col">
        <label for="email">Email</label>
        <input
          v-model="form.email"
          class="p-2"
          id="email"
          type="email"
          placeholder="john@gmail.com"
          autocomplete="false"
        />
      </div>
      <div class="formgroup mb-6 flex flex-col">
        <label for="password">Password</label>
        <input
          v-model="form.password"
          type="password"
          id="password"
          class="p-2"
          placeholder="*************"
          autocomplete="false"
        />
      </div>

      <button
        class="text-white p-4 text-center text-md w-full bg-brand-blue mb-3"
        @click="$emit('submit')"
      >
        Submit
      </button>
    </div>
</template>

<script setup>
defineProps({
  form: Object,
  title: String,
});
</script>
