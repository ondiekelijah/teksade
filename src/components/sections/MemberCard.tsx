/* eslint-disable @next/next/no-img-element */
import { api } from "@/utils/api";
import { Avatar, Popover, Text } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { FaGithub, FaPhoneAlt, FaTwitter } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";

interface MemberCardProps {
  memberId: string;
  isCreator: boolean;
  isMultiple?: boolean;
}
export default function MemberCard({ memberId, isCreator, isMultiple }: MemberCardProps) {
  const memberInfo = api.members.getMemberInfo.useQuery({ memberId: memberId });

  return (
    <div className={`flex items-center ${!isMultiple && "gap-x-4"}`}>
      <Popover withArrow>
        <Popover.Target>
          <div className={`flex items-center ${!isMultiple && "gap-x-4"}`}>
            {/* Check if there's a valid image URL. If not, use initials. */}
            <Avatar size="lg" src={memberInfo.data?.imageUrl} alt={memberInfo.data?.name ?? "avatar"} className="rounded-full object-cover">
              {
                // Use initials.
                memberInfo.data?.name
                  ?.split(" ")
                  .map((name) => name[0])
                  .join("")
              }
            </Avatar>

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
        </Popover.Target>

        <Popover.Dropdown>
          <div className="flex flex-col ">
            <p>{memberInfo.data?.name}</p>
            <Text color="dimmed" className="whitespace-nowrap text-xs">
              {memberInfo.data?.role}, {memberInfo.data?.institution}
            </Text>
          </div>
          <section className=" mt-2 flex items-center gap-x-2">
            {memberInfo.data?.github && (
              <Link href={memberInfo.data.github}>
                <FaGithub size={20} />
              </Link>
            )}
            {memberInfo.data?.twitter && (
              <Link href={memberInfo.data.twitter}>
                <FaTwitter size={20} />
              </Link>
            )}
            {memberInfo.data?.website && (
              <Link href={memberInfo.data.website}>
                <TbWorldWww size={20} />
              </Link>
            )}
            {memberInfo.data?.phone && (
              <Link href={`tel:${memberInfo.data.phone}`}>
                <FaPhoneAlt size={20} />
              </Link>
            )}
          </section>
        </Popover.Dropdown>
      </Popover>
    </div>
  );
}
