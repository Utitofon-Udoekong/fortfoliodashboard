<script setup lang="ts">
import { object, string, ref as yupRef } from "yup";
import { configure } from "vee-validate";
// import { onMounted, ref } from "vue";

const debug = ref(false);
onMounted(() => {
  debug.value =
    useRouter().currentRoute.value.query.debug === "true" ? true : false;
    
});

const existingEmail = async (value) => {
  const result = await $fetch("/api/checkemail?email=" + value);
  return result ? true : false;
};

const handleSubmit = (values, actions) => {
  console.log(values);
  actions.resetForm();
};

configure({
  validateOnBlur: true, // controls if `blur` events should trigger validation with `handleChange` handler
  validateOnChange: true, // controls if `change` events should trigger validation with `handleChange` handler
  validateOnInput: false, // controls if `input` events should trigger validation with `handleChange` handler
  validateOnModelUpdate: true, // controls if `update:modelValue` events should trigger validation with `handleChange` handler
});

const schema = object({
  email: string()
    .required()
    .email()
    .test(
      "email-is-taken",
      "Email is already taken",
      async (value) => !(await existingEmail(value))
    )
    .label("Email Address"),
  password: string().required().min(8).label("Your Password"),
  confirmed: string()
    .required()
    .oneOf([yupRef("password")], "Passwords do not match") //Cross-Field Validation
    .label("Your Confirmation Password"),
});

const initialValues = { email: "", password: "", confirmed: "" };
</script>


<template>
  <div class="h-screen">
    <div class="flex justify-center items-center">
      <div
        class=""
      >
        <h2 class="title p-2 text-center mb-6 ">
          VeeValidate Tutorial
        </h2>
        <VForm
          class="p-5 border border-gray-900 rounded-md"
          :validation-schema="schema"
          :initial-values="initialValues"
          v-slot="{ meta: formMeta, errors: formErrors }"
          @submit="handleSubmit"
        >
          <button
            class="p-2 bg-gray-900 text-white"
            @click="debug = !debug"
          >
            {{ debug ? "Remove Debug" : "Show Debug" }}
          </button>

          <h2 class="title is-4 mt-2">Sign Up</h2>

          <VTextInput
            type="email"
            name="email"
            label="Email"
            placeholder="Email"
            :debug="debug"
          />
          <VTextInput
            type="password"
            name="password"
            label="Password"
            placeholder="Password"
            :debug="debug"
          />
          <VTextInput
            type="password"
            name="confirmed"
            label="Confirm Password"
            placeholder="Confirm Password"
            :debug="debug"
          />

          <template v-if="Object.keys(formErrors).length">
            <p class="help is-danger has-text-weight-bold">
              Please correct the following errors:
            </p>
            <ul>
              <li
                v-for="(message, field) in formErrors"
                :key="field"
                class="help is-danger"
              >
                {{ message }}
              </li>
            </ul>
          </template>

          <button
            class="button mt-3 bg-gray-900 text-white p-2"
            :class="{ 'is-primary': formMeta.valid }"
            :disabled="!formMeta.valid"
            type="submit"
          >
            Submit
          </button>

          <div class="debug" v-if="debug">
            <pre>{{ formMeta }}</pre>
          </div>
        </VForm>
      </div>
    </div>
  </div>
</template>

<style scoped>
.columns {
  min-height: 100vh;
}

.wrapper {
  min-width: 100%;
  min-height: 100%;
  background-image: url("~/assets/images/hero-2.jpg");
  background-size: cover;
  background-position: center;
}
</style>
