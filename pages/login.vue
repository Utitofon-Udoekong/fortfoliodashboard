<template>
  <div class="flex items-center justify-center h-screen">
    <div class="text-center text-black max-w-full px-2 sm:px-0 sm:max-w-3xl">
      <h1 class="text-2xl sm:text-5xl font-bold pb-3">
        Oops, sorry this feature is not yet available on the website.
      </h1>
      <p class="text-lg pb-10">
        Contact
        <a href="tel:+234 807 073 8825" class="text-brand-blue"
          >+234 807 073 8825</a
        >
        to process your request.
      </p>
      <button class="text-white p-4 rounded-md">
        <a href="https://wa.link/rpdo9m" target="_blank">Chat us on WhatsApp</a>
      </button>
      <p class="pt-10 flex justify-center items-center">
        <Icon icon="cil:arrow-left" class="pr-2" width="25" />Go back
        <a href="/" class="text-brand-blue pl-2">home</a>
      </p>
    </div>
  </div>
  <div
    class="bg-login-texture h-screen w-full bg-center bg-cover flex justify-center items-center bg-brand-lightblue bg-blend-overlay"
  >
    <div class="w-full flex md:flex-row flex-col justify-center items-center">
      <div
        class="hidden md:block bg-login-texture w-1/3 h-96 bg-center bg-cover relative"
      >
        <div
          class="logo bg-white w-2/5 h-24 shadow-lg -mt-3 flex items-center justify-center absolute"
        >
          <a href="/">
            <img
              src="@/assets/images/logo-text.png"
              class="w-4/5 h-auto"
              alt="logo"
            />
          </a>
        </div>
      </div>
      <div class="bg-white md:w-1/3 w-11/12 p-8 shadow-xl">
        <p class="text-brand-lightblue text-3xl">Welcome to Fortfolio</p>
        <p class="text-gray-600 pb-4">
          Sign In by entering your information below
        </p>
        <div>
          <form class="w-full" @submit.prevent="submitForm">
            <div class="mb-4">
              <label for="emailText" class="text-gray-700 font-semibold text-md"
                >Email</label
              >
              <div
                class="border-2 focus-within:border-brand-lightblue hover:border-brand-lightblue rounded-md"
              >
                <input
                  class="text-md border-gray-300 appearance-none bg-transparent border-none w-full mr-3 py-3 px-2 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Enter your email"
                  aria-label="Email"
                  id="emailText"
                  v-model="state.email"
                />
              </div>
              <small v-if="v$.email.$error" class="text-red-600">{{
                v$.email.$errors[0].$message
              }}</small>
            </div>
            <div class="mb-2">
              <label for="password" class="text-gray-700 font-semibold text-md"
                >Password</label
              >
              <div
                class="relative border-2 border-gray-300 focus-within:border-brand-lightblue hover:border-brand-lightblue rounded-md"
              >
                <input
                  class="text-md appearance-none bg-transparent border-none w-full mr-3 py-3 px-2 leading-tight focus:outline-none"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Password"
                  aria-label="password"
                  id="password"
                  v-model="state.password"
                />
                <div>
                  <svg
                    viewBox="0 0 24 24"
                    width="25"
                    height="25"
                    fill="#333"
                    class="inline-block absolute right-2 top-2 cursor-pointer"
                    @click="showPassword = !showPassword"
                  >
                    <path :d="showPassword ? mdiEye : mdiEyeOff" />
                  </svg>
                </div>
              </div>
              <small v-if="v$.password.$error" class="text-red-600">{{
                v$.password.$errors[0].$message
              }}</small>
            </div>
            <div class="mb-8">
              <input type="checkbox" id="check" class="mr-2" />
              <label for="check">Remember me</label>
            </div>
            <button
              @click.prevent="submitForm"
              type="submit"
              class="bg-brand-lightblue text-white text-lg font-semibold p-3 w-full rounded-md"
            >
              Login
            </button>
            <p class="text-center text-gray-600 pt-4">
              Don't have an account?
              <a href="/signup" class="text-brand-lightblue">Sign up</a> or go
              <a href="/" class="text-brand-lightblue">Home</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const state = reactive({
  email: "",
  password: "",
});
const alpha = helpers.regex(
  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
);
const incorrectPasswordMessage =
  "Password must be atleast 8 characters, contain a number, a special character, and an uppercase letter.";
const rules = computed(() => {
  return {
    email: { required, email },
    password: {
      required,
      alpha: helpers.withMessage(incorrectPasswordMessage, alpha),
    },
  };
});

const showPassword = ref(false);

const v$ = useVuelidate(rules, state);
const submitForm = async () => {
  await this.v$.$validate();
  if (!this.v$.$error) this.$router.push("/constructionpage");
  else console.log("error");
};
</script>

<style>
button {
  background: #00af9c;
}
</style>
