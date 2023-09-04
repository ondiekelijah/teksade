/* eslint-disable @next/next/no-img-element */
import { api } from "@/utils/api";
import { Avatar, Text, Tooltip } from "@mantine/core";
import Link from "next/link";
import React from "react";

interface MemberCardProps {
  memberId: string;
  isCreator: boolean;
  isMultiple?: boolean;
}
export default function MemberCard({ memberId, isCreator, isMultiple }: MemberCardProps) {
  const memberInfo = api.members.getMemberInfo.useQuery({ memberId: memberId });

  return (
    <div className={`flex items-center ${!isMultiple && "gap-x-4"}`}>
      <Link href="#" className="my-2">
        <div className={`flex items-center ${!isMultiple && "gap-x-4"}`}>
          <Tooltip label={memberInfo.data?.name} withArrow>
            {/* Check if there's a valid image URL. If not, use initials. */}
            <Avatar size="lg" src={null} alt={memberInfo.data?.name ?? "avatar"} className="rounded-full object-cover">
              {
                // Use initials.
                memberInfo.data?.name
                  ?.split(" ")
                  .map((name) => name[0])
                  .join("")
              }
            </Avatar>
          </Tooltip>
          {!isMultiple && (
            <div className="flex flex-col">
              <p className="text-xs">{isCreator ? "Contributor" : null}</p>
              <p>{memberInfo.data?.name}</p>
              <Text color="dimmed" className="whitespace-nowrap text-xs">
                {memberInfo.data?.role}, {memberInfo.data?.institution}
              </Text>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
