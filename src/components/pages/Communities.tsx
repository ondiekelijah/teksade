/* eslint-disable @next/next/no-img-element */
import { api } from "@/utils/api";
import { Button, Collapse, Menu, Select, TextInput } from "@mantine/core";
import { BsFilter, BsFire, BsSearch } from "react-icons/bs";
import { VscDiffAdded } from "react-icons/vsc";
import React, { useState } from "react";
import CommmunityCard from "@/components/sections/CommmunityCard";
import { useDisclosure } from "@mantine/hooks";
import { countries, techFocusAreas, technologies } from "@/utils/constants";
import Container from "@/components/custom-components/container";
import { MultiSelect } from "@mantine/core";
import { PageSEO } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata";
import { useMantineColorScheme } from "@mantine/core";
import StickyBanner from "@/components/custom-components/newsBanner";
import CommunityCardSkeleton from "../custom-components/skeletons/Community/CommunityCard";

export default function CommunitiesPage() {
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>(undefined);
  const [filterByNewlyCreated, setFilterByNewlyCreated] = useState(false);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[] | undefined>(undefined);
  const [selectedFocusAreas, setSelectedFocusares] = useState<string[] | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);

  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const communitiesList = api.communities.getCommunitiesList.useQuery({
    limit: 50,
    country: selectedCountry,
    filterByNew: filterByNewlyCreated,
    focusAreas: selectedFocusAreas,
    technologies: selectedTechnologies,
    searchTerm: searchTerm,
  });
  const [filtersOpen, { toggle }] = useDisclosure(false);

  return (
    <>
      <PageSEO title={"Communities"} description={siteMetadata.community_description} />
      <Container>
        <div className="">
          <section className="my-8 flex w-full items-center justify-between ">
            <Menu trigger="hover" openDelay={100} closeDelay={4000}>
              <Menu.Target>
                <Button variant="subtle" rightIcon={<BsFilter />} className={`shadow-lg" flex items-center gap-x-2 p-2 text-base ${dark ? "text-slate-400" : "text-slate-600"}`}>
                  Popularity
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item onClick={() => setFilterByNewlyCreated(false)} icon={<BsFire />}>
                  Popular
                </Menu.Item>
                <Menu.Item onClick={() => setFilterByNewlyCreated(true)} icon={<VscDiffAdded />}>
                  Newly Created
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>

            <Button onClick={toggle} variant="subtle" rightIcon={<BsFilter />} className={`shadow-lg" flex items-center gap-x-2 p-2 px-4 text-base ${dark ? "text-slate-400" : "text-slate-600"}`}>
              Filters
            </Button>
          </section>
          <Collapse in={filtersOpen}>
            <div className="my-5 flex w-full flex-col  gap-2 sm:flex sm:flex-row sm:items-center sm:justify-between">
              <TextInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} radius="xl" rightSection={<BsSearch className="flex" />} placeholder="Search by name" />
              <MultiSelect
                data={techFocusAreas}
                placeholder="Focus areas e.g. AI, Blockchain"
                value={selectedFocusAreas}
                onChange={setSelectedFocusares}
                searchable
                clearButtonProps={{ "aria-label": "Clear selection" }}
                clearable
                className=" flex-1"
                radius="xl"
              />
              <MultiSelect
                data={technologies}
                placeholder="Related Technologies e.g. React, Python"
                value={selectedTechnologies}
                onChange={setSelectedTechnologies}
                searchable
                clearButtonProps={{ "aria-label": "Clear selection" }}
                clearable
                className=" flex-1"
                radius="xl"
              />

              <Select clearable radius="xl" data={countries} searchable placeholder="Country" value={selectedCountry} onChange={(val) => setSelectedCountry(val ?? undefined)} className=" flex-1" />
            </div>
          </Collapse>
        </div>
        {communitiesList.isLoading && (
          <section className="grid grid-cols-1 gap-1 gap-x-2 sm:grid-cols-3 md:grid-cols-3 ">
            <CommunityCardSkeleton />
            <CommunityCardSkeleton />
            <CommunityCardSkeleton />
          </section>
        )}
        <section className="grid grid-cols-1 gap-1 gap-x-2 sm:grid-cols-3 md:grid-cols-3 ">
          {communitiesList.data?.length
            ? communitiesList.data.map((community) => (
                <>
                  {community.published && (
                    <CommmunityCard
                      id={community.id}
                      key={community.id}
                      name={community.name}
                      country={community.country}
                      location={community.location}
                      description={community.description}
                      members={community._count.members}
                      logoUrl={community.logo_link}
                      verified={community.verified ?? false}
                    />
                  )}
                </>
              ))
            : !communitiesList.isLoading && (
                <div className="my-20 text-center sm:col-span-3 md:col-span-4">
                  It looks like there aren&apos;t any communities that fit those specifics. Don&apos;t worry—adjusting your filters might help!
                </div>
              )}
        </section>
      </Container>
    </>
  );
}
