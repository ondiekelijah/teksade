import { PageSEO } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className=" mx-3 flex h-full w-full items-center justify-center">
      <PageSEO title={"Sign in to Teksade"} description={siteMetadata.signInPage_description} />
      <SignIn />
    </div>
  );
}
