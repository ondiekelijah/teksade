import React, { type ReactNode } from "react";
import Header from "../sections/Header";
import StickyBanner from "../custom-components/newsBanner";
import Footer from "../sections/Footer";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <main className=" w-full overflow-clip">
      <StickyBanner />
      <div className="sticky top-0 z-50 w-full">
        <Header />
      </div>
      <section className=" z-0 w-full">{children}</section>
      <Footer />
    </main>
  );
}
