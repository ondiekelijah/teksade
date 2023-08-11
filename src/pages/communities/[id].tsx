/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @next/next/no-img-element */
import { api } from "@/utils/api";
import { Button, LoadingOverlay, Paper, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { FcLike } from "react-icons/fc";
import { TbWorldWww } from "react-icons/tb";
import { BsGithub, BsTwitter, BsWhatsapp } from "react-icons/bs";
import React from "react";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { ref } from "firebase/storage";
import { storageBucket } from "@/utils/firestoreConfig";
import MemberCard from "@/components/sections/MemberCard";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { showNotification } from "@mantine/notifications";

export default function SingleCommunityPage() {
  const communityId = useRouter().query.id;
  const { user } = useUser();
  const queryClient = api.useContext();
  const memberInfo = api.members.getMemberInfo.useQuery({ memberId: user?.id ?? "" });
  const communityInfo = api.communities.getCommunityInfo.useQuery({ communityId: communityId as string });
  const addLikeToCommunity = api.likes.addLikeToCommunity.useMutation();
  const getCommunityLikeCount = api.likes.getCommunintyLikes.useQuery({ communityId: communityId as string });
  const addMemberToCommunity = api.communities.addMemberToCommunity.useMutation();
  const [logoImage] = useDownloadURL(ref(storageBucket, `logos/${communityInfo.data?.logo_link}`));

  return (
    <div className=" container mx-auto grid grid-cols-1 p-2 sm:grid-cols-3">
      <img src={logoImage ?? "/img/hero.jpg"} alt="logo" className=" max-h-[50vh] w-full  rounded object-cover" />
      <div className="flex flex-col gap-y-1 py-2 sm:col-span-2 sm:px-8">
        <div className=" flex items-center justify-between">
          <h3 className=" uppercase">{communityInfo.data?.name}</h3>
          <span>
            <LoadingOverlay visible={addMemberToCommunity.isLoading} />
            {memberInfo.data?.name ? (
              <Button
                onClick={() => {
                  void addMemberToCommunity
                    .mutateAsync({
                      communityId: (communityId as string) ?? "",
                      memberId: user?.id ?? "",
                    })
                    .then((returnValue) => {
                      if (returnValue?._count.members) {
                        showNotification({
                          title: "Welcome onboard",
                          message: "You are now a member",
                        });
                        void queryClient.communities.getCommunityInfo.refetch();
                      } else {
                        showNotification({
                          title: "Error!",
                          message: "Something went wrong",
                        });
                      }
                    });
                }}
                className=" rounded-full"
              >
                Join community
              </Button>
            ) : (
              <Link href="/profile">
                <Button className=" rounded-full">Join community</Button>
              </Link>
            )}
          </span>
        </div>
        <div className=" flex items-center gap-x-4 ">
          <Text color="dimmed" className="">
            {communityInfo.data?.location} , {communityInfo.data?.country}
          </Text>

          <Text color="dimmed" className="">
            {communityInfo.data?.members.length} Members
          </Text>
          <Text color="dimmed" className=" flex items-center  gap-1">
            {communityId && memberInfo.data?.name && (
              <Button
                onClick={() => {
                  void addLikeToCommunity
                    .mutateAsync({
                      communityId: communityId as string,
                      memberId: memberInfo.data?.id ?? "",
                    })
                    .then(() => {
                      void queryClient.likes.getCommunintyLikes.refetch({ communityId: communityId as string });
                    });
                }}
                className=" rounded-full"
                variant="subtle"
                rightIcon={<FcLike className=" text-xl" />}
              >
                {getCommunityLikeCount.data?._count.likes ?? 0}
              </Button>
            )}
          </Text>
        </div>
        <p className=" font-bold uppercase">Focus Area : {communityInfo.data?.focus_area}</p>
        <Text color="dimmed">{communityInfo.data?.description}</Text>

        <div className=" my-1 flex items-center  gap-1 overflow-x-scroll">
          {communityInfo.data?.technologies.map((tech) => (
            <Paper withBorder className="  whitespace-nowrap   rounded-full  border-2  border-teksade p-1 px-2 text-sm shadow-xl hover:bg-teksade" key={tech}>
              {tech}
            </Paper>
          ))}
        </div>
        <div className=" flex  justify-around gap-x-8 ">
          <TbWorldWww size={20} />
          <BsGithub size={20} />
          <BsTwitter size={20} />
          <BsWhatsapp size={20} />
        </div>
        <MemberCard memberId={communityInfo.data?.creatorId ?? ""} isCreator />
      </div>
      <div className=" grid grid-cols-1 sm:col-span-3 sm:grid-cols-3 md:grid-cols-4 ">
        <h3 className=" sm:col-span-3  md:col-span-4">Members</h3>
        {communityInfo.data?.members.map((member) => (
          <MemberCard key={member.id} isCreator={false} memberId={member.id} />
        ))}
      </div>
    </div>
  );
}
