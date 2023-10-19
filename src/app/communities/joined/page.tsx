import ProtectedPageLayout from "@/app/_components/layouts/ProtectedPageLayout";
import JoinedCommunities from "@/app/_components/pages/JoinedCommunities";

export default function JoinedCommunitiesPage() {
  return (
    <ProtectedPageLayout>
      <JoinedCommunities />
    </ProtectedPageLayout>
  );
}
