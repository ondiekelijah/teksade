import { api } from "@/utils/api";
import Container from "../custom-components/container";
import { useUser } from "@clerk/nextjs";
import CommmunityCard from "../sections/CommmunityCard";
import SectionTitle from "../custom-components/sectionTitle";
import CommunityCardSkeleton from "../custom-components/skeletons/Community/CommunityCard";
import CustomButton from "../custom-components/button";
import { useRouter } from "next/router";
import { BsSearch } from "react-icons/bs";
import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";
import { TextInput, useMantineColorScheme } from "@mantine/core";

export default function JoinedCommunities() {
  const { user } = useUser();
  const router = useRouter();
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [debouncedValue] = useDebounce(debouncedSearchTerm, 500);

  const communitiesJoinedByMember = api.members.getCommunitiesJoinedByMember.useQuery({ memberId: user?.id ?? "", searchTerm: debouncedValue });

  useEffect(() => {
    setDebouncedSearchTerm(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    void communitiesJoinedByMember.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);
  return (
    <Container>
      <SectionTitle heading="My Tribes" description="The pulse of your digital life – all your communities at your fingertips" />
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

      {!communitiesJoinedByMember.data?.communities_joined && (
        <div className="my-20 text-center sm:col-span-3 md:col-span-4">
          {`Haven't found your tribe? 🤔 Explore Communities now!`}
          <div className="my-6 flex justify-center">
            <CustomButton size="lg" className="text-base" variant="filled" type="submit" title="Explore Communities" onClickHandler={() => void router.push("/communities")} />
          </div>
        </div>
      )}

      {communitiesJoinedByMember.data?.communities_joined.length === 0 && (
        <div className="my-20 text-center sm:col-span-3 md:col-span-4">
          {searchTerm ? (
            <>
              No results found for <span className={`${dark ? "text-[#00afef]" : "text-[#1A56DB]"}`}>{searchTerm}</span>. Try searching with a different keyword.
            </>
          ) : (
            `It looks like you haven't joined any communities on Teksade. Let's get started!`
          )}

          <div className="my-6 flex justify-center">
            <CustomButton size="lg" className="text-base" variant="filled" type="submit" title="Explore Communities" onClickHandler={() => void router.push("/communities")} />
          </div>
        </div>
      )}
    </Container>
  );
}
