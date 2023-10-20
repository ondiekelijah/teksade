import { fontFamily } from "tailwindcss/defaultTheme";
import { withAnimations } from "animated-tailwindcss";

export default withAnimations({
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        teksade: "#1A56DB",
      },
    },
  },
  plugins: [],
});
