const defaultTheme = require('tailwindcss/defaultTheme');
const { withAnimations } = require('animated-tailwindcss')


module.exports = withAnimations({
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        sunrise: ['"Waiting for the Sunrise"', ...defaultTheme.fontFamily.sans],
      },
      container: {
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },

      screens: {
        xs: '475px',
        ...defaultTheme.screens,
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require("daisyui")],
  daisyui: {
    themes: [
      {
        teksadeDark: {
          "primary": "#4338CA",
          "secondary": "#d926a9",
          "accent": "#1fb2a6",
          "neutral": "#2a323c",
          "base-100": "#111929",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
      },
      {
        teksadeLight: {
          "primary": "#4338CA",
          "secondary": "#d926a9",
          "accent": "#1fb2a6",
          "neutral": "#2a323c",
          "base-100": "#F5F5F5",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
      }

    ]
  },


});
