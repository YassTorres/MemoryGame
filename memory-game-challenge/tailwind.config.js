/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'md': '700px', // Ahora sí modificará el breakpoint original manteniendo los demás
      },
    },
  },
  plugins: [],
}