// const colors = require('tailwindcss/colors')

module.exports = {
  content: ['index.html','./src/**/*.{js,jsx,ts,tsx,vue,html}'],
  theme: {
    extend: {
      colors: {
        ftBlack: {
          100: '#060606'
        },
        ftWhite: {
          100: '#F6F5FF'
        },
        ftGrey: {
          100: '#8C8DAF',
          200: '#1D1C2D'
        },
        ftPurple: {
          100: '#D7B8FF',
          200: '#D6ADFF',
          300: '#9F54FF',
          400: '#883DE7',
        },
        ftBlue: {
          100: '#9CACFF',
          200: '#384FCD'
        }
      }
    },
  },
  plugins: [],
}
