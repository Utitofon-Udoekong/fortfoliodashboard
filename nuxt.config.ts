import { defineNuxtConfig } from 'nuxt'
import Icons from "unplugin-icons/vite"
import IconsResolver from "unplugin-icons/resolver"
import Components from "unplugin-vue-components/vite"

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  // css: ["~/assets/css/tailwind.css"],
  buildModules: [
    '@pinia/nuxt',
  ],
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
    transpile: [
      "swiper"
    ]
  },
  vite: {
    plugins: [
      Components({
        resolvers: [IconsResolver()]
      }),
      Icons(),
    ],
  },
  publicRuntimeConfig: {
    API_KEY: process.env.API_KEY,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    PROJECT_ID: process.env.PROJECT_ID,
    STORAGE_BUCKET: process.env.STORAGE_BUCKET,
    MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
    APP_ID: process.env.APP_ID,
    MEASUREMENT_ID: process.env.MEASUREMENT_ID,
    RECAPTCHA_SERVER_KEY: process.env.RECAPTCHA_SERVER_KEY,
    FIREBASE_DEBUG_TOKEN: process.env.FIREBASE_DEBUG_TOKEN,
    EGO_ID: process.env.EGO_ID,
  },
  privateRuntimeConfig: {
    API_KEY: process.env.API_KEY,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    PROJECT_ID: process.env.PROJECT_ID,
    STORAGE_BUCKET: process.env.STORAGE_BUCKET,
    MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
    APP_ID: process.env.APP_ID,
    MEASUREMENT_ID: process.env.MEASUREMENT_ID,
    RECAPTCHA_SERVER_KEY: process.env.RECAPTCHA_SERVER_KEY,
    FIREBASE_DEBUG_TOKEN: process.env.FIREBASE_DEBUG_TOKEN,
    EGO_ID: process.env.EGO_ID,
  },
})
