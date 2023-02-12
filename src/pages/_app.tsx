import "@/css/fonts.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
//
import "@/css/main.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  );
}

export default MyApp;
