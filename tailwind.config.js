/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      borderWidth: {
        '1': '1px',
      },
      colors: {
        'maxim': {
          50: '#fff0fa',
          100: '#ffe4f7',
          200: '#ffc9f0',
          300: '#ff9ce3',
          400: '#ff5fcd',
          500: '#ff30b6',
          600: '#f50d94',
          700: '#e0007c',
          800: '#b00461',
          900: '#920953',
          950: '#5b002f',
        },
        'custom': {
          500: '#D41A69',
          600: '#C00052',
          700: '#A00042',
        }
      },
      screens: {
        'xs': '0px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1600px',
      },
      fontFamily: {
        sans: ['"Manrope"', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwindcss'),
    require('tailwindcss-animated'),
    require('autoprefixer'),
    require('flowbite/plugin'),
  ],
}
