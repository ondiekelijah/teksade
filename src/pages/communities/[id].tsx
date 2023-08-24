import { useRouter } from "next/router";
import React from "react";
import Container from "@/components/custom-components/container";


export default function SingleCommunityPage() {
  const communityId = useRouter().query.id;
  return (
    <Container>
      <p>Page for community with id:{communityId}</p>
      <p>🚧 Work in progress</p>
    </Container>
  );
}
