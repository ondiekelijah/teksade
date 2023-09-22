import ProtectedPageLayout from "@/components/layouts/ProtectedPageLayout";
import ProfilePage from "@/components/pages/Profile";

export default function Profile() {
  return (
    <ProtectedPageLayout>
      <ProfilePage />
    </ProtectedPageLayout>
  );
}
