import { RedirectToSignUp, SignedIn, SignedOut } from "@clerk/nextjs";
import { ReactNode } from "react";

interface ProtectedPageLayoutProps {
  children: ReactNode;
}
export default function ProtectedPageLayout({ children }: ProtectedPageLayoutProps) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignUp />
      </SignedOut>
    </>
  );
}
