<script setup lang="ts">
// import { object, string, ref as yupRef } from "yup";
// import { configure } from "vee-validate";
import { useUserStore } from "~~/store/users";
const store = useUserStore()
const router = useRouter()
const {$auth} = useNuxtApp()

const mama = async () => {
  await store.setInvestments()
}
const papa = () => {
  console.log(store.getInvestments)
}
// const debug = ref(false);
onMounted(() => {
  // debug.value =
  //   useRouter().currentRoute.value.query.debug === "true" ? true : false;
    
});

interface Login {
    email: string,
    password: string,
    confirmed: string
}
let email = ref("")
let password = ref("")
// let confirm = ref("")

// const existingEmail = async (value: string) => {
//   const result = await $fetch("/api/checkemail?email=" + value);
//   return result ? true : false;
// };
const login = async () => {
  await store.login().then(() => {
    router.push("/dashboard")
  })
}
// const handleSubmit = async (values: Login, actions: { resetForm: () => void; }) => {
//   console.log(values);
//   actions.resetForm();
//   await store.login().then(() => {
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
</script>

<template>
  <div class="h-screen">
    <Html>
      <Head>
        <Title>Login - Admin</Title>
        <Meta name="description" content="Fortfolio Admin Signup page"/>
      </Head>
    </Html>
    <div class="flex justify-center items-center h-full">
      <div
        class=""
      >
        <h2 class="title p-2 text-center mb-6 ">
          Login Admin
        </h2>
        <label for="email">Email</label>
        <input type="email" id="email" required v-model="email">
        <label for="password">Password</label>
        <input type="text" id="password" required v-model="password">
        <button @click="login"
              class="hover:underline-current text-brand-light-blue text-sm"
              >Signup</button
            >
      </div>
    </div>
  </div>
</template>

