import { PageSEO } from "@/components/SEO";
import ProtectedPageLayout from "@/components/layouts/ProtectedPageLayout";
import CreatedCommunitiesPage from "@/components/pages/CreatedCommunities";
import siteMetadata from "@/data/siteMetadata";

export default function Created() {
  return (
    <ProtectedPageLayout>
      <PageSEO title={"Manage Communities"} description={siteMetadata.add_community_description} />
      <CreatedCommunitiesPage />
    </ProtectedPageLayout>
  );
}
