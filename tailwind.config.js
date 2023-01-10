const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx,mdx,html}'],
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
  plugins: [require('@tailwindcss/forms')],
};
