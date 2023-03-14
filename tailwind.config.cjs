module.exports = {
  mode: "jit",
  content: ['./**/*.{svelte,html}'],
  plugins: [
    require("@tailwindcss/typography"),
    require('@tailwindcss/line-clamp'),
    require('daisyui')],
  daisyui: {
    styled: true,
    themes: ["winter", "dark"],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
};
