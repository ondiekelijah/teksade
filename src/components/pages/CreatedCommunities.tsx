import { api } from "@/utils/api";
import Container from "../custom-components/container";
import { useUser } from "@clerk/nextjs";
import CommmunityCard from "../sections/CommmunityCard";
import { Button, LoadingOverlay, Paper } from "@mantine/core";
import { openConfirmModal, openModal } from "@mantine/modals";
import CommunityUpdateModal from "../sections/CommunityUpdateModal";

export default function CreatedCommunitiesPage() {
  const { user } = useUser();
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
      },
    });
  }
  function handleUpdate(communityID: string) {
    openModal({
      title: "Update Community  details",
      children: <CommunityUpdateModal communityId={communityID} />,
      centered: true,
    });
  }
  return (
    <Container>
      <LoadingOverlay visible={deleteCreatedCommunity.isLoading} />
      <div className=" grid grid-cols-1 gap-2 p-2 sm:grid-cols-3">
        {communitiesCreatedByMember.data?.map((community) => (
          <Paper withBorder key={community.id} className=" flex flex-col  p-2 ">
            <CommmunityCard
              id={community.id}
              description={community.description}
              location={community.location}
              country={community.country}
              name={community.name}
              members={community._count.members ? community._count.members : 0}
              verified={community.verified ? true : false}
              logoUrl={community.logo_link}
            />
            <div className="flex w-full items-center justify-between">
              <Button onClick={() => handleDelete(community.id)} color="red">
                Delete
              </Button>
              <Button onClick={() => handleUpdate(community.id)}>Update</Button>
            </div>
          </Paper>
        ))}
      </div>
    </Container>
  );
}
