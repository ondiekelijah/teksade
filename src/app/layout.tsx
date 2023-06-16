"use client"
import "@/css/main.css"
import "@/css/fonts.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en"  >
      <body className='antialiased dark:highlight-white/5 bg-neutral-100 text-slate-900 dark:bg-gray-800 dark:text-white' >
        <ThemeProvider attribute="class" defaultTheme="system">
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
