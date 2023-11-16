/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black': '#000',
        'primary': '#ffdf80',
        'white': '#ffffff',
        'gray': '#343a40',
        'lightgray': '#4d4d4d',
        'tblue': '#2963a3',
      },
    },
  },
  plugins: [],
}