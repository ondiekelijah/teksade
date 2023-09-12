import { api } from "@/utils/api";
import Container from "../custom-components/container";
import { useUser } from "@clerk/nextjs";
import CommmunityCard from "../sections/CommmunityCard";
import { Button, LoadingOverlay, Paper, useMantineTheme } from "@mantine/core";
import { openConfirmModal, openModal } from "@mantine/modals";
import CommunityUpdateModal from "../sections/CommunityUpdateModal";
import { useState } from "react";
import CustomButton from "../custom-components/button";
import SectionTitle from "../custom-components/sectionTitle";
import CommunityCardSkeleton from "../custom-components/skeletons/Community/CommunityCard";
import { useRouter } from "next/router";

export default function CreatedCommunitiesPage() {
  const theme = useMantineTheme();
  const { user } = useUser();
  const router = useRouter();
  const queryClient = api.useContext();
  const communitiesCreatedByMember = api.members.getCommunitiesCreatedByMember.useQuery({ memberId: user?.id ?? "" });
  const deleteCreatedCommunity = api.communities.deleteCommunity.useMutation({
    onSuccess: () => {
      void queryClient.members.getCommunitiesCreatedByMember.refetch({ memberId: user?.id ?? "" });
    },
  });

  function handleDelete(communityID: string) {
    openConfirmModal({
      title: "Confirm Deletion",
      children: "Deleting a community  will clear all related data Parmanently.",
      labels: { confirm: "Confirm", cancel: "Cancel" },
      centered: true,
      onConfirm: () => {
        deleteCreatedCommunity.mutate({
          communityID: communityID,
        });
        void router.push("/communities/created");
      },
    });
  }
  function handleUpdate(communityID: string) {
    openModal({
      title: "Edit Your Community Details",
      children: <CommunityUpdateModal communityId={communityID} />,
      centered: true,
      size: "xl",
      overlayProps: {
        color: theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      },
    });
  }

  return (
    <Container className={"py-5"}>
      <LoadingOverlay visible={deleteCreatedCommunity.isLoading} />
      <SectionTitle
        heading="Community Curator's Corner"
        description="Every community you've shaped has a story, a rhythm, and a pulse. Here, in your corner, you get to write those stories and keep the heartbeats strong. Thank you for being the driving force behind each narrative!"
      />
      {/*  Loading skeleton */}
      {communitiesCreatedByMember.isLoading ? (
        <div className=" grid grid-cols-1 gap-2 p-2 sm:grid-cols-3">
          <CommunityCardSkeleton isEditing={true} />
          <CommunityCardSkeleton isEditing={true} />
          <CommunityCardSkeleton isEditing={true} />
          <CommunityCardSkeleton isEditing={true} />
        </div>
      ) : (
        <div className=" grid grid-cols-1 gap-2 p-2 sm:grid-cols-3">
          {/* Error */}
          {communitiesCreatedByMember.data?.map((community) => (
            <div key={community.id}>
              <CommmunityCard
                id={community.id}
                description={community.description}
                location={community.location}
                country={community.country}
                name={community.name}
                members={community._count.members ? community._count.members : 0}
                verified={community.verified ? true : false}
                logoUrl={community.logo_link}
                actionButtons={
                  <div className="flex w-full items-center justify-between">
                    <CustomButton size="sm" variant="filled" title="Delete" onClickHandler={() => handleDelete(community.id)} color="red" />
                    <CustomButton size="sm" variant="filled" title="Update" onClickHandler={() => handleUpdate(community.id)} />
                  </div>
                }
              />
            </div>
          ))}

          {!communitiesCreatedByMember.data?.length && (
            <div className="my-20 text-center sm:col-span-3 md:col-span-4">
              It looks like you haven&apos;t added any communities to Teksade. Let&apos;s get started!
              <div className="my-6 flex justify-center">
                <CustomButton size="lg" className="text-base" variant="filled" type="submit" title="Add Community" onClickHandler={() => void router.push("/communities/new")} />
              </div>
            </div>
          )}
        </div>
      )}
    </Container>
  );
}
