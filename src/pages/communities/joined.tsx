import { PageSEO } from "@/components/SEO";
import ProtectedPageLayout from "@/components/layouts/ProtectedPageLayout";
import JoinedCommunities from "@/components/pages/JoinedCommunities";
import siteMetadata from "@/data/siteMetadata";

export default function JoinedCommunitiesPage() {
  return (
    <ProtectedPageLayout>
      <PageSEO title={"My Communities"} description={siteMetadata.community_description} />
      <JoinedCommunities />
    </ProtectedPageLayout>
  );
}
