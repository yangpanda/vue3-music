const {
  routeLocationKey
} = require("vue-router");

module.exports = {
  purge: ['./index.html', './src/**/*.{vue, js}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      zIndex: {
        '-10': '-10'
      },
      animation: {
        'cd-rotate': 'cd-rotate 20s linear infinite'
      },
      keyframes: {
        'cd-rotate': {
          '0%': {
            transform: 'rotate(0deg)'
          },
          '50%': {
            transform: 'rotate(180deg)'
          },
          '100%': {
            transform: 'rotate(360deg)'
          },
        }
      },
      padding: {
        '9/16': 'calc(100% / (16 / 9))'
      },
      lineHeight: {
        '12': '3rem',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
