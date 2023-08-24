/* eslint-disable @next/next/no-img-element */
import { api } from "@/utils/api";
import { Button, Chip, Collapse, Menu, Select, TextInput } from "@mantine/core";
import { BsFilter, BsFire, BsSearch } from "react-icons/bs";
import { VscDiffAdded } from "react-icons/vsc";
import React, { useState } from "react";
import CommmunityCard from "@/components/sections/CommmunityCard";
import { useDisclosure } from "@mantine/hooks";
import { countries, techFocusAreas } from "@/utils/constants";
import Container from "@/components/custom-components/container";
import { MultiSelect } from "@mantine/core";
import technologies from "@/data/technologies";

export default function CommunitiesPage() {
  const [selectedCountry, setSelectedCountry] = useState("Kenya");
  const [filterByNewlyCreated, setFilterByNewlyCreated] = useState(false);
  const [selectedFocusArea, setSelectedFocusArea] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const communitiesList = api.communities.getCommunitiesList.useQuery({ limit: 50, country: selectedCountry, filterByNew: filterByNewlyCreated, focusAreas: selectedFocusArea });
  const [filtersOpen, { toggle }] = useDisclosure(false);

  const [selectedFocusAreas, setSelectedFocusAreas] = useState<string[]>([]);

  return (
    <Container>
      <div className="">
        <section className="my-2 flex w-full items-center justify-between ">
          <Menu trigger="hover" openDelay={100} closeDelay={400}>
            <Menu.Target>
              <Button variant="subtle" rightIcon={<BsFilter />} className="flex items-center gap-x-2 p-2 text-base shadow-lg">
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
          <Button onClick={toggle} variant="subtle" rightIcon={<BsFilter />} className="flex items-center gap-x-2 p-2 px-4 text-base shadow-lg">
            Filters
          </Button>
        </section>
        <Collapse in={filtersOpen}>
          <div className="my-5 flex w-full flex-col flex-wrap gap-2 sm:flex sm:flex-row sm:items-center">
            <MultiSelect
              data={technologies}
              placeholder="Pick all that you like"
              value={selectedFocusAreas}
              onChange={setSelectedFocusAreas}
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              clearButtonProps={{ "aria-label": "Clear selection" }}
              clearable
              className="sm:order-2 sm:w-[60%]"
              radius="xl"
            />

            <TextInput radius="xl" className="sm:w-[20%]" rightSection={<BsSearch className="flex-1 text-teksade " />} />

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
            />
          ))
        ) : (
          <div className="my-10 text-center sm:col-span-3 md:col-span-4">No communities matched your search filters</div>
        )}
      </section>
    </Container>
  );
}
