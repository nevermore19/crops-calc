import textShadow from 'tailwindcss-textshadow'

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,vue}",
  ],
  theme: {
    extend: {},
  },
  plugins: [textShadow],
}