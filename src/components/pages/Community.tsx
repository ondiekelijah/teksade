/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @next/next/no-img-element */
import { api } from "@/utils/api";
import { Avatar, LoadingOverlay, Text } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { ref } from "firebase/storage";
import { storageBucket } from "@/utils/firestoreConfig";
import MemberCard from "@/components/sections/MemberCard";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { showNotification } from "@mantine/notifications";
import { FaTwitter, FaGithub, FaYoutube, FaLinkedin, FaWhatsapp, FaGlobe, FaPhone, FaUserFriends, FaMapMarkedAlt } from "react-icons/fa";
import { Group, ActionIcon, Tooltip, Chip } from "@mantine/core";
import Image from "next/image";
import { useMantineColorScheme } from "@mantine/core";
import Checkmark from "@/components/custom-components/checkmark";
import Container from "@/components/custom-components/container";
import CustomButton from "@/components/custom-components/button";
import { CommunitySEO } from "@/components/SEO";
import LikeButton from "../custom-components/likeButton";
import CommunitySkeleton from "../custom-components/skeletons/Community/Community";
import ImageSkeleton from "../custom-components/skeletons/Community/FeaturedImage";

const verificationTooltip = "Endorsed for its official connection with the named organization, this community is proudly verified.";

interface VerificationTooltipProps {
  verified?: boolean | null;
}

interface SocialLinksProps {
  links: {
    twitter: string;
    github: string;
    linkedin: string;
    website: string;
    whatsapp: string;
    phone: string;
    [key: string]: string | undefined;
  };
}

interface TechnologiesProps {
  technologies: string[];
  dark: boolean;
}

const VerificationTooltip = ({ verified }: VerificationTooltipProps) => {
  return verified ? (
    <Tooltip withArrow label={verificationTooltip} arrowSize={5}>
      <Text>
        <Checkmark />
      </Text>
    </Tooltip>
  ) : null;
};

const SocialLinks = ({ links }: SocialLinksProps) => {
  const icons = {
    twitter: FaTwitter,
    github: FaGithub,
    linkedin: FaLinkedin,
    website: FaGlobe,
    whatsapp: FaWhatsapp,
    phone: FaPhone,
  };
  return (
    <Group spacing="xs" noWrap className="my-6">
      {Object.entries(icons).map(([key, Icon]) => (
        <Link key={key} href={links[key] ?? " "} passHref>
          <ActionIcon size="lg" variant="default" radius="xl">
            <Icon />
          </ActionIcon>
        </Link>
      ))}
    </Group>
  );
};

const Technologies = ({ technologies, dark }: TechnologiesProps) => {
  const textColor = dark ? "text-[#00afef]" : "text-[#1A56DB]";
  return (
    <div className="mt-7 flex flex-wrap items-center">
      {technologies.map((tech) => (
        <Chip key={tech} value={tech} className="mb-2 mr-2">
          <p className={textColor}>{tech}</p>
        </Chip>
      ))}
    </div>
  );
};

export default function SingleCommunityPage() {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const communityId = useRouter().query.id;
  const { user } = useUser();
  const queryClient = api.useContext();
  const memberInfo = api.members.getMemberInfo.useQuery({ memberId: user?.id ?? "" });
  const communityInfo = api.communities.getCommunityInfo.useQuery({ communityId: communityId as string });
  const addLikeToCommunity = api.likes.addLikeToCommunity.useMutation();
  const getCommunityLikeCount = api.likes.getCommunintyLikes.useQuery({ communityId: communityId as string });
  const addMemberToCommunity = api.communities.addMemberToCommunity.useMutation();
  const [logoImage, loading] = useDownloadURL(ref(storageBucket, `logos/${communityInfo.data?.logo_link}`));

  // Check if current member is already a member of the community
  const isMember = communityInfo.data?.members.some((member) => member.id === memberInfo.data?.id);

  const linksData = {
    twitter: communityInfo.data?.twitter ?? "",
    github: communityInfo.data?.github ?? "",
    linkedin: communityInfo.data?.linkedin ?? "",
    website: communityInfo.data?.website ?? "",
    whatsapp: communityInfo.data?.whatsapp ?? "",
    phone: communityInfo.data?.phone ?? "",
  };

  const likeCommunity = (communityId: string, memberId: string) => {
    void addLikeToCommunity
      .mutateAsync({
        communityId: communityId,
        memberId: memberId,
      })
      .then(() => {
        void queryClient.likes.getCommunintyLikes.refetch({ communityId: communityId });
      });
  };

  const addMember2Community = (communityId: string, memberId: string) => {
    void addMemberToCommunity
      .mutateAsync({
        communityId: communityId,
        memberId: memberId,
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
            message: "Hmm, that wasn't supposed to happen.",
          });
        }
      });
  };

  return (
    <>
      <CommunitySEO
        name={communityInfo.data?.name ?? " "}
        description={communityInfo.data?.description ?? " "}
        logoLink={communityInfo.data?.logo_link ?? " "}
        website={communityInfo.data?.website ?? " "}
        technologies={communityInfo.data?.technologies ?? []}
        country={communityInfo.data?.country ?? " "}
        location={communityInfo.data?.location ?? " "}
        focusArea={communityInfo.data?.focus_area ?? " "}
      />
      <Container>
        <div className="flex items-center py-10">
          <div className=" grid grid-cols-1 lg:grid-cols-2 lg:gap-x-20">
            {/* Image Content */}
            <div className="order-1 h-full w-full lg:order-2">
              {loading ? (
                <ImageSkeleton />
              ) : (
                <Image src={logoImage ?? "/img/hero.jpg"} alt="featured-image" className="h-full w-full rounded-lg object-cover" width={700} height={500} loading="lazy" />
              )}
            </div>

            {/* Text Content */}
            {communityInfo.isLoading ? (
              <CommunitySkeleton />
            ) : (
              <div className="order-2 space-y-5 lg:order-1">
                <div className="mt-4 flex flex-col gap-4">
                  <h1 className="mt-1 text-2xl font-semibold md:text-2xl">
                    {communityInfo.data?.name} <VerificationTooltip verified={communityInfo.data?.verified} />
                  </h1>
                  <p className={`text-sm font-medium leading-4 ${dark ? "text-slate-400" : "text-slate-600"}`}>{communityInfo.data?.focus_area}</p>
                </div>

                <div className="flex items-center space-x-4 text-sm font-medium">
                  <dd className={`flex items-center ${dark ? "text-[#00afef]" : "text-[#1A56DB]"}`}>
                    <FaUserFriends className="mr-2 text-lg" />
                    <span className={`font-normal ${dark ? "text-slate-400" : "text-slate-600"}`}>
                      {communityInfo.data?.members.length}
                      {communityInfo.data?.members.length === 1 ? " Member" : " Members"}
                    </span>
                  </dd>
                  <dd className={`flex items-center ${dark ? "text-[#00afef]" : "text-[#1A56DB]"}`}>
                    <FaMapMarkedAlt className="ml-2 mr-2 text-lg" />
                    <span className={`font-normal ${dark ? "text-slate-400" : "text-slate-600"}`}>
                      {communityInfo.data?.location}, {communityInfo.data?.country}
                    </span>
                  </dd>
                  {communityId && memberInfo.data?.name && (
                    <span className="flex items-center">
                      <p className={`-mr-7 text-sm font-medium leading-4 ${dark ? "text-slate-400" : "text-slate-600"}`}>{getCommunityLikeCount.data?._count.likes ?? 0}</p>
                      <LikeButton
                        onClickHandler={() => {
                          memberInfo.data?.id && likeCommunity(communityId as string, memberInfo.data?.id);
                        }}
                      />
                    </span>
                  )}
                </div>

                <div>
                  <LoadingOverlay visible={addMemberToCommunity.isLoading} />
                  {!isMember ? (
                    <CustomButton
                      size="md"
                      color="indigo"
                      title={"Join Community"}
                      onClickHandler={() => {
                        memberInfo.data?.id && addMember2Community(communityId as string, memberInfo.data.id);
                      }}
                      loadingText="Joining..."
                      isLoading={addMemberToCommunity.isLoading}
                    />
                  ) : memberInfo.data?.id === communityInfo.data?.creatorId ? (
                    <Link href="/communities/created">
                      <CustomButton size="md" color="indigo" title={"Update Commununity"} />
                    </Link>
                  ) : (
                    <Link href="/profile">
                      <CustomButton size="md" color="indigo" title={"Leave Community"} />
                    </Link>
                  )}
                </div>

                <p className={`${dark ? "text-gray-300" : "text-gray-700"}`}>{communityInfo.data?.description}</p>
                <SocialLinks links={linksData} />
                <Technologies technologies={communityInfo.data?.technologies ?? []} dark={dark} />
                <MemberCard memberId={communityInfo.data?.creatorId ?? ""} isCreator />
                <p className={dark ? "text-slate-400" : "text-slate-600"}>Members</p>
                <div className="flex">
                  <Tooltip.Group openDelay={300} closeDelay={100}>
                    <Avatar.Group spacing="sm">
                      {communityInfo.data?.members.map((member) => (
                        <MemberCard key={member.id} isCreator={false} memberId={member.id} isMultiple />
                      ))}
                    </Avatar.Group>
                  </Tooltip.Group>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
