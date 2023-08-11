/* eslint-disable @next/next/no-img-element */
import { api } from "@/utils/api";
import { Avatar, Text } from "@mantine/core";
import Link from "next/link";
import React from "react";

interface MemberCardProps {
  memberId: string;
  isCreator: boolean;
}
export default function MemberCard({ memberId, isCreator }: MemberCardProps) {
  const memberInfo = api.members.getMemberInfo.useQuery({ memberId: memberId });
  return (
    <Link href="/profile" className="rounded p-4 shadow-xl">
      <div className=" flex  items-center gap-x-4 ">
        <Avatar size="lg" src="/img/profileholder.jpg" className="rounded-full object-cover" />
        <div className=" flex flex-col ">
          <p className=" text-xs uppercase"> {isCreator ? "Creator" : null}</p>
          <p>{memberInfo.data?.name}</p>
          <Text color="dimmed" className=" whitespace-nowrap text-xs">
            {memberInfo.data?.role} ,{memberInfo.data?.institution}
          </Text>
        </div>
      </div>
    </Link>
  );
}
