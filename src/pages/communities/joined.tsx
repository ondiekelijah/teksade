import { PageSEO } from "@/components/SEO";
import JoinedCommunities from "@/components/pages/JoinedCommunities";
import siteMetadata from "@/data/siteMetadata";

export default function JoinedCommunitiesPage() {
  return (
    <>
      <PageSEO title={"My Communities"} description={siteMetadata.community_description} />
      <JoinedCommunities />
    </>
  );
}
