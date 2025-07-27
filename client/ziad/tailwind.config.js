/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
 theme: {
    extend: {
      keyframes: {
        gradientMove: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        gradient: 'gradientMove 3s linear infinite',
      },
    },
  },
  plugins: [],
}