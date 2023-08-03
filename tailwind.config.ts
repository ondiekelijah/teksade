import { withAnimations } from 'animated-tailwindcss';

export default withAnimations({
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "teksade": "#1A56DB"
      }
    },
  },
  plugins: [],
});
