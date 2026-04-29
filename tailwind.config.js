/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'space-dark': '#0B0F19',
        'accent-blue': '#5C6BFF',
      },
      fontFamily: {
        primary: ['Montserrat', 'sans-serif'],
        secondary: ['Raleway', 'sans-serif'],
      },
    },
  },
  plugins: [],
}