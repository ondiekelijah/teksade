import { api } from "@/utils/api";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";

const useAdminCheck = () => {
  const { user } = useUser();
  const currentUser = api.members.getMemberInfo.useQuery({ memberId: user?.id ?? "" });

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const allowedAdminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS!.split(",");
    const userIsAllowedAdmin = allowedAdminEmails.includes(user?.primaryEmailAddress?.emailAddress ?? "");

    if (userIsAllowedAdmin && currentUser.data?.db_role === "admin") {
      setIsAdmin(true);
    }
  }, [user, currentUser.data]);

  return isAdmin;
};

export default useAdminCheck;
