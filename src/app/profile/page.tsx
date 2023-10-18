import ProtectedPageLayout from "../_components/layouts/ProtectedPageLayout";
import ProfilePage from "../_components/pages/Profile";

export default function Profile() {
  return (
    <ProtectedPageLayout>
      <ProfilePage />
    </ProtectedPageLayout>
  );
}
