/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          'fundo': '#222831',
          'boxes': '#31363F',
          'amarelo': '#FFD369',
          'azul': '#00CED1'

        }
      }
    },
  },
  plugins: [],
};
