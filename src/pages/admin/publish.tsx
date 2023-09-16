import CustomButton from "@/components/custom-components/button";
import Container from "@/components/custom-components/container";
import CommmunityCard from "@/components/sections/CommmunityCard";
import { api } from "@/utils/api";
import { useUser } from "@clerk/nextjs";

export default function PublishCommunityPage() {
  const { user } = useUser();
  const unpulblishedCommunities = api.communities.getUnpulishedCommunities.useQuery();
  const publishAndSendEmail = api.emails.publishAndsendCommunityPublishedEmail.useMutation();
  function handlePublish(communityId: string) {
    publishAndSendEmail.mutate({
      communityId,
    });
  }
  return (
    <Container className="">
      <section className=" grid grid-cols-1 gap-2 sm:grid-cols-3">
        {user?.primaryEmailAddress?.emailAddress === "teksadeproject@gmail.com" ? (
          unpulblishedCommunities.data?.map((community) => (
            <CommmunityCard
              key={community.name}
              id={community.id}
              description={community.description}
              location={community.location}
              country={community.country}
              name={community.name}
              members={0}
              verified={community.verified ? true : false}
              logoUrl={community.logo_link}
              actionButtons={
                <div className="flex w-full items-center justify-between">
                  <CustomButton size="sm" variant="filled" title="Revoke" color="red" />
                  <CustomButton size="sm" variant="filled" title="Publish" onClickHandler={() => handlePublish(community.id)} />
                </div>
              }
            />
          ))
        ) : (
          <div className=" text-center sm:col-span-3">Unauthorized Acess !!!</div>
        )}
      </section>
    </Container>
  );
}