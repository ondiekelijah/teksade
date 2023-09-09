import { PageSEO } from "@/components/SEO";
import CreatedCommunitiesPage from "@/components/pages/CreatedCommunities";
import siteMetadata from "@/data/siteMetadata";

export default function Created() {
  return (
    <>
      <PageSEO title={"Manage Communities"} description={siteMetadata.add_community_description} />
      <CreatedCommunitiesPage />
    </>
  );
}
