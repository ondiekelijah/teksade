import { PageSEO } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className=" mx-2 flex h-full w-full items-center justify-center">
      <PageSEO title={"Join Teksade Today"} description={siteMetadata.signInPage_description} />
      <SignUp />
    </div>
  );
}
