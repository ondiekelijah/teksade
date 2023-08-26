import React from "react";
import Container from "@/components/custom-components/container";
import { PageSEO } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata";

export default function AboutPage() {
  return (
    <>
      <PageSEO title={"Teksade - About Us"} description={siteMetadata.about_description} />
      <Container></Container>
    </>
  );
}
