/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#04152d',
        black2: '#041226',
        black3: '#020c1b',
        lighterBlack: '#1c4b91',
        lightBlack: '#173d77',
        pink: '#da2f68',
        orange: '#f89e00',
        
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      screens: {
        'xsm': '330px',
        'mbl': '400px',
      },
    },
  },
  plugins: [],
}

