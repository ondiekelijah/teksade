import ConnectSection from "@/components/sections/ConnectSection";
import Contribute from "@/components/sections/Contribute";
import Hero from "@/components/sections/Hero";
import NewsLetter from "@/components/sections/NewsLetter";
import PopularCommunities from "@/components/sections/PopularCommunities";
import React from "react";

export default function HomePage() {
  return (
    <div className="">
      <Hero />
      <PopularCommunities />
      <ConnectSection />
      <NewsLetter />
      <Contribute />
    </div>
  );
}
