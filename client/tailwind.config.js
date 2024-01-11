/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark': '#353535',
        'lightgray': '#B9B9B9',
        'gray': '#565959',
        'darkgray': '#4D4B4D',
        'white': '#FFFFFF',
        'primary': '#3C6E71',
        'secondary': '#284B63',
      },
      maxWidth: {
        'content': '900px',
      },
      backgroundImage: {
        'home-cityscape': "url('home-city.jpg')",
      }
    },
  },
  plugins: [],
}