import { api } from "@/utils/api";
import Container from "../custom-components/container";
import { useUser } from "@clerk/nextjs";
import CommmunityCard from "../sections/CommmunityCard";
import SectionTitle from "../custom-components/sectionTitle";
import CommunityCardSkeleton from "../custom-components/skeletons/Community/CommunityCard";

export default function JoinedCommunities() {
  const { user } = useUser();
  const communitiesJoinedByMember = api.members.getCommunitiesJoinedByMember.useQuery({ memberId: user?.id ?? "" });
  return (
    <Container>
      <SectionTitle heading="My Tribes" description="The pulse of your digital life – all your communities at your fingertips" />
      {/*  Loading skeleton */}
      {communitiesJoinedByMember.isLoading ? (
        <div className=" grid grid-cols-1 gap-2 p-2 sm:grid-cols-3">
          <CommunityCardSkeleton />
          <CommunityCardSkeleton />
          <CommunityCardSkeleton />
          <CommunityCardSkeleton />
        </div>
      ) : (
        <div className=" grid grid-cols-1 gap-2 p-2 sm:grid-cols-3">
          {communitiesJoinedByMember.data?.communities_joined.map((community) => (
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
              />
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}
