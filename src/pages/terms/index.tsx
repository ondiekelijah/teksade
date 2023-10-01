import { PageSEO } from "@/components/SEO";
import Terms from "@/components/pages/Terms";

export default function TermsPage() {
  return (
    <>
      <PageSEO title="Terms and Conditions" description="Learn about the rules and guidelines for using Teksade, your community discovery tech platform." />
      <Terms />
    </>
  );
}
