import ConnectSection from "@/components/sections/ConnectSection";
import Contribute from "@/components/sections/Contribute";
import Hero from "@/components/sections/Hero";
import NewsLetter from "@/components/sections/NewsLetter";
import PopularCommunities from "@/components/sections/PopularCommunities";
import React from "react";
import { PageSEO } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata";

export default function HomePage() {
  return (
    <>
      <PageSEO title={"Teksade: The Tech Community HQ"} description={siteMetadata.description} />
      <Hero />
      <PopularCommunities />
      <ConnectSection />
      <NewsLetter />
      <Contribute />
    </>
  );
}
