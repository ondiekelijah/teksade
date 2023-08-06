import { useRouter } from "next/router";
import React from "react";

export default function SingleCommunityPage() {
  const communityId = useRouter().query.id;
  return (
    <div className=" container mx-auto">
      <p>Page for community with id:{communityId}</p>
      <p>🚧 Work in progress</p>
    </div>
  );
}
