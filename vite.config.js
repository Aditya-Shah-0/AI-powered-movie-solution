/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'tektur': ['Tektur', 'sans-serif'], // Now you can just use `font-tektur`
      },
      clipPath: {
        'triangle-bottom': 'polygon(100% 100%, 0 100%, 50% 30%)', // Create a custom utility
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // A good plugin for form styling
    function ({ addUtilities }) {
      addUtilities({
        '.clip-triangle-bottom': {
          'clip-path': 'polygon(100% 100%, 0 100%, 50% 30%)',
        },
      })
    }
  ],
}