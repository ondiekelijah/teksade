import { PageSEO } from "@/components/SEO";
import NewCommunityPage from "@/components/pages/AddCommunity";
import siteMetadata from "@/data/siteMetadata";

export default function AddCommunity() {
  return (
    <>
      <PageSEO title={"Add Community"} description={siteMetadata.add_community_description} />
      <NewCommunityPage />
    </>
  );
}
