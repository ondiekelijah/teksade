import { PageSEO } from "@/components/SEO";
import CustomButton from "@/components/custom-components/button";
import Container from "@/components/custom-components/container";
import SectionTitle from "@/components/custom-components/sectionTitle";
import ProtectedPageLayout from "@/components/layouts/ProtectedPageLayout";
import CommmunityCard from "@/components/sections/CommmunityCard";
import siteMetadata from "@/data/siteMetadata";
import useAdminCheck from "@/hooks/useAuth";
import useMantineNotify from "@/hooks/useNotify";
import { api } from "@/utils/api";
import { useUser } from "@clerk/nextjs";

export default function PublishCommunityPage() {
  const { notifyError, notifySuccess } = useMantineNotify();
  const { user } = useUser();
  const userIsAdmin = useAdminCheck();
  const unpulblishedCommunities = api.communities.getUnpulishedCommunities.useQuery();
  const publishAndSendEmail = api.emails.publishAndsendCommunityPublishedEmail.useMutation();

  function handlePublish(communityId: string) {
    publishAndSendEmail.mutate({
      communityId,
    });
  }
  return (
    <ProtectedPageLayout>
      <Container>
        <PageSEO title={"Admin"} description={siteMetadata.community_description} />
        <SectionTitle heading="Admin Panel" description="Publish Communities" />
        <section className=" grid grid-cols-1 gap-2 sm:grid-cols-3">
          {user?.primaryEmailAddress?.emailAddress && userIsAdmin ? (
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
            <div className="text-center sm:col-span-3">{`Oops! You don't have permission to view this.`}</div>
          )}
        </section>
      </Container>
    </ProtectedPageLayout>
  );
}
