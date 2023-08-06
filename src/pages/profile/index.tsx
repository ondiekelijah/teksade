import { UserProfile } from "@clerk/nextjs";
import React from "react";

export default function ProfilePage() {
  return (
    <div className=" flex w-full flex-col items-center">
      <UserProfile />
    </div>
  );
}
