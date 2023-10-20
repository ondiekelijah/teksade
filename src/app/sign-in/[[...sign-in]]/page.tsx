import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className=" mx-3 flex h-full w-full items-center justify-center">
      <SignIn />
    </div>
  );
}
