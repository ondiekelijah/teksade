import React from "react";
import Container from "@/components/custom-components/container";
import { PageSEO } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata";
import About from "@/components/pages/About";

export default function AboutPage() {
  return (
    <>
      <PageSEO title={"About Us"} description={siteMetadata.about_description} />
      <About />
    </>
  );
}
