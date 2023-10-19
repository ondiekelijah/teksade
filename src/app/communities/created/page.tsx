import ProtectedPageLayout from "@/app/_components/layouts/ProtectedPageLayout";
import CreatedCommunitiesPage from "@/app/_components/pages/CreatedCommunities";

export default function Created() {
  return (
    <ProtectedPageLayout>
      <CreatedCommunitiesPage />
    </ProtectedPageLayout>
  );
}
