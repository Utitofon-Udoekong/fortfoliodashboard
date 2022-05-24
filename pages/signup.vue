<script setup lang="ts">
// import { object, string, ref as yupRef } from "yup";
// import { configure } from "vee-validate";
import { useUserStore } from "~~/store/users";

const router = useRouter()

// interface Signup {
//     email: string,
//     password: string,
//     confirmed: string
// }
// const store = useUserStore()

// const debug = ref(false);
// onMounted(() => {
//   debug.value =
//     useRouter().currentRoute.value.query.debug === "true" ? true : false;
// });

// const existingEmail = async (value: string) => {
//   const result = await $fetch("/api/checkemail?email=" + value);
//   return result ? true : false;
// };

// const handleSubmit = (values: Signup, actions: { resetForm: () => void; }) => {
//   console.table(values);
//   actions.resetForm();
//   store.register($auth,values.email,values.password).then(() => {
//     router.replace("/dashboard")
//   })
// };

// configure({
//   validateOnBlur: true, // controls if `blur` events should trigger validation with `handleChange` handler
//   validateOnChange: true, // controls if `change` events should trigger validation with `handleChange` handler
//   validateOnInput: false, // controls if `input` events should trigger validation with `handleChange` handler
//   validateOnModelUpdate: true, // controls if `update:modelValue` events should trigger validation with `handleChange` handler
// });

// const schema = object({
//   email: string()
//     .required()
//     .email()
//     .test(
//       "email-is-taken",
//       "Email is already taken",
//       async (value) => !(await existingEmail(value))
//     )
//     .label("Email Address"),
//   password: string().required().min(8).label("Your Password"),
//   confirmed: string()
//     .required()
//     .oneOf([yupRef("password")], "Passwords do not match") //Cross-Field Validation
//     .label("Your Confirmation Password"),
// });

// const initialValues = { email: "", password: "", confirmed: "" };

// const {$auth} = useNuxtApp()
</script>

<template>
  <div class="h-screen">
    <Html>
      <Head>
        <Title>Register - Admin</Title>
        <Meta name="description" content="Fortfolio Admin Signup page" />
      </Head>
    </Html>
    <div class="flex justify-center items-center h-full">
      <div class="">
        <h2 class="title p-2 text-center mb-6">Register Admin</h2>
        <!-- <VForm
          class="p-5 border border-brand-blue rounded-md"
          :validation-schema="schema"
          :initial-values="initialValues"
          v-slot="{ meta: formMeta, errors: formErrors }"
          @submit="handleSubmit"
        >
          <button class="p-2 bg-gray-900 text-white" @click="debug = !debug">
            {{ debug ? "Remove Debug" : "Show Debug" }}
          </button>

          <h2 class="title font-semibold text-md my-2">Sign up</h2>

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
            <p class="help is-danger has-text-weight-bold font-semibold pt-4">
              Please correct the following errors:
            </p>
            <ul>
              <li
                v-for="(message, field) in formErrors"
                :key="field"
                class="text-red-500"
              >
                {{ message }}
              </li>
            </ul>
          </template>

          <div class="flex justify-between items-center">
            <button
              class="button my-3 bg-gray-900 text-white p-2"
              :class="{ 'is-primary': formMeta.valid }"
              :disabled="!formMeta.valid"
              type="submit"
            >
              Submit
            </button>
            <NuxtLink
              to="/login"
              class="hover:underline-current text-brand-light-blue text-sm"
              >Login</NuxtLink
            >
          </div>

          <div class="debug" v-if="debug">
            <pre>{{ formMeta }}</pre>
          </div>
        </VForm> -->
      </div>
    </div>
  </div>
</template>
