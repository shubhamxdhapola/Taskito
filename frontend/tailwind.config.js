/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '450px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
        'mobile': {'max': '639px'},
        'tablet': {'min': '640px', 'max': '1023px'},
        'desktop': {'min': '1024px'},
        'custom': {'min': '1100px'},
      },
    },
  },
  plugins: [],
}
