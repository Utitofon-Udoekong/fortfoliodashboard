import { defineNuxtConfig } from 'nuxt3'
import Icons from "unplugin-icons/vite"
import IconsResolver from "unplugin-icons/resolver"
import Components from "unplugin-vue-components/vite"

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  // css: ["~/assets/css/tailwind.css"],
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
})
