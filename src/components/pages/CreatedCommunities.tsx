import { api } from "@/utils/api";
import Container from "../custom-components/container";
import { useUser } from "@clerk/nextjs";
import CommmunityCard from "../sections/CommmunityCard";
import { Button, LoadingOverlay, Paper, TextInput, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { openConfirmModal, openModal } from "@mantine/modals";
import CommunityUpdateModal from "../sections/CommunityUpdateModal";
import { useEffect, useState } from "react";
import CustomButton from "../custom-components/button";
import SectionTitle from "../custom-components/sectionTitle";
import CommunityCardSkeleton from "../custom-components/skeletons/Community/CommunityCard";
import { useRouter } from "next/router";
import { BsSearch } from "react-icons/bs";
import { useDebounce } from "use-debounce";

export default function CreatedCommunitiesPage() {
  const theme = useMantineTheme();
  const { user } = useUser();
  const router = useRouter();
  const queryClient = api.useContext();
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [debouncedValue] = useDebounce(debouncedSearchTerm, 500);

  const communitiesCreatedByMember = api.members.getCommunitiesCreatedByMember.useQuery({
    memberId: user?.id ?? "",
    searchTerm: debouncedValue,
  });

  useEffect(() => {
    setDebouncedSearchTerm(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    void communitiesCreatedByMember.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const deleteCreatedCommunity = api.communities.deleteCommunity.useMutation({
    onSuccess: () => {
      void queryClient.members.getCommunitiesCreatedByMember.refetch({ memberId: user?.id ?? "" });
    },
  });

  function handleDelete(communityID: string) {
    openConfirmModal({
      title: "Confirm Deletion",
      children: "Deleting this community means all related data will be lost forever.",
      labels: { confirm: "Confirm", cancel: "Cancel" },
      centered: true,
      confirmProps: { color: "red" },
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
      size: "100%",
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
        description="Every community you've shaped has a story, a rhythm, and a pulse. Here, in your corner, you get to write those stories and keep the heartbeats strong."
      />
      <div className="mb-4 flex justify-center">
        <TextInput
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          radius="xl"
          rightSection={<BsSearch className="flex" />}
          placeholder="Search by name"
          className="w-full sm:w-3/4 lg:w-1/2 xl:w-1/3"
        />
      </div>
      {/*  Loading skeleton */}
      {communitiesCreatedByMember.isLoading ? (
        <div className=" grid grid-cols-1 gap-2 p-2 sm:grid-cols-3">
          <CommunityCardSkeleton isEditing={true} />
          <CommunityCardSkeleton isEditing={true} />
          <CommunityCardSkeleton isEditing={true} />
          <CommunityCardSkeleton isEditing={true} />
        </div>
      ) : (
        <div>
          <div className=" grid grid-cols-1 gap-2 p-2 sm:grid-cols-3">
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
                {searchTerm ? (
                  <>
                    No results found for <span className={`${dark ? "text-[#00afef]" : "text-[#1A56DB]"}`}>{searchTerm}</span>. Try searching with a different keyword.
                  </>
                ) : (
                  `It looks like you haven't added any communities to Teksade. Let's get started!`
                )}

                <div className="my-6 flex justify-center">
                  <CustomButton size="lg" className="text-base" variant="filled" type="submit" title="Add Community" onClickHandler={() => void router.push("/communities/new")} />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Container>
  );
}
