/* eslint-disable @next/next/no-img-element */
import { api } from "@/utils/api";
import { Button, Chip, Collapse, LoadingOverlay, Menu, Select, TextInput } from "@mantine/core";
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

export default function CommunitiesPage() {
  const [selectedCountry, setSelectedCountry] = useState("Kenya");
  const [filterByNewlyCreated, setFilterByNewlyCreated] = useState(false);
  const [selectedFocusAreas, setSelectedFocusAreas] = useState<string[]>([]);
  // const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const communitiesList = api.communities.getCommunitiesList.useQuery(
    { limit: 50, 
      country: selectedCountry, 
      filterByNew: filterByNewlyCreated, 
      focusAreas: selectedFocusAreas, 
      search: searchValue ,
      // technologies: selectedTechnologies
    },
    {
      staleTime: 0,
    }
  );
  const [filtersOpen, { toggle }] = useDisclosure(false);
console.log(selectedFocusAreas)
  return (
    <>
      {/* TODO: Move actual page logic to a different component and import here. */}
      <PageSEO title={"Teksade - Communities"} description={siteMetadata.community_description} />
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
            <div className="my-5 flex w-full flex-col flex-wrap gap-2 sm:flex sm:flex-row sm:items-center">
              {/* <MultiSelect
                data={technologies}
                placeholder="Filter by tech e.g. React"
                value={selectedTechnologies}
                onChange={setSelectedTechnologies}
                clearButtonProps={{ "aria-label": "Clear selection" }}
                clearable
                searchable
                className="sm:order-2 sm:w-[60%]"
                radius="xl"
              /> */}
              <MultiSelect
                data={techFocusAreas}
                placeholder="Filter by focus area e.g. AI"
                value={selectedFocusAreas}
                onChange={setSelectedFocusAreas}
                clearButtonProps={{ "aria-label": "Clear selection" }}
                clearable
                searchable
                className="sm:order-2 sm:w-[60%]"
                radius="xl"
              />

              <TextInput
                radius="xl"
                className="sm:w-[20%]"
                rightSection={<BsSearch className="flex-" />}
                value={searchValue}
                onChange={(e) => setSearchValue(e.currentTarget.value)}
                placeholder="Search by name"
              />
              <Select radius="xl" data={countries} searchable placeholder="Country" className="flex-1 sm:order-3 sm:w-[20%]" value={selectedCountry} onChange={(val) => setSelectedCountry(val!)} />
            </div>
          </Collapse>
        </div>

        <section className="grid grid-cols-1 gap-1 gap-x-2 sm:grid-cols-3 md:grid-cols-3 ">
          {communitiesList.data?.length ? (
            communitiesList.data.map((community) => (
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
            ))
          ) : (
            <div className="my-10 text-center sm:col-span-3 md:col-span-4">No communities matched your search filters</div>
          )}
        </section>
      </Container>
    </>
  );
}
