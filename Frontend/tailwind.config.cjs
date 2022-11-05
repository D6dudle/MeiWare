/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'darkBlack' : '#161616',
        'black2' : '#282828',
        'gray1' : '#4F4F4f',
        'gray2' : '#6D6D6D',
        'gray3' : '#828282',
        'gray4' : '#BDBDBD',
        'gray5' : '#E0E0E0',
        'white' : '#F2F2F2',
        'primary' : '#ECC039',
        'secondary' : '#8EA4FF',
        'error' : '#FF9090',
        'success' : '#93D1AD',
      },
      boxShadow: {
        'btn': '0 0 4px 0.5px rgba(236, 192, 57, 1)',
      }
    },
    fontFamily : {
      'IBM' : "'IBM Plex Sans', sans-serif",
    }
  },
  plugins: [],
}