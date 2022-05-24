module.exports = {
  mode: "jit",
  content: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    // "./nuxt.config.{js,ts}",
  ],
  media: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand:{
          grey: "#EFF0F6",
          blue: "#03426d",
          light: {
            blue: "#00ADEE"
          },
          clear_white: "#ffffff23",
          green : "#4BDE97",
          ash: "#B9B9B9",
          red: "#DF1414"
        }
      },
      backgroundImage: {
        'login-texture': "url('./assets/images/mansitting.jpg')",
        'login-texture-f': "url('./assets/images/womantyping.jpg')",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};