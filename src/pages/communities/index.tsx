/* eslint-disable @next/next/no-img-element */
import { api } from "@/utils/api";
import { Button, Chip, Collapse, Menu, Select, TextInput } from "@mantine/core";
import { BsFilter, BsFire, BsSearch } from "react-icons/bs";
import { VscDiffAdded } from "react-icons/vsc";
import React, { useState } from "react";
import CommmunityCard from "@/components/sections/CommmunityCard";
import { useDisclosure } from "@mantine/hooks";
import { countries, techFocusAreas } from "@/utils/constants";

export default function CommunitiesPage() {
  const [selectedCountry, setSelectedCountry] = useState("Kenya");
  const [filterByNewlyCreated, setFilterByNewlyCreated] = useState(false);
  const communitiesList = api.communities.getCommunitiesList.useQuery({ limit: 50, country: selectedCountry, filterByNew: filterByNewlyCreated });
  const [filtersOpen, { toggle }] = useDisclosure(false);

  return (
    <div className="container mx-auto p-2">
      <div className="">
        <section className="my-2 flex w-full items-center justify-between ">
          <Menu>
            <Menu.Target>
              <Button variant="subtle" rightIcon={<BsFilter />} className="flex items-center gap-x-2 p-2 px-4 shadow-lg">
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
          <Button onClick={toggle} variant="subtle" rightIcon={<BsFilter />} className="flex items-center gap-x-2 p-2 px-4 shadow-lg">
            Filters
          </Button>
        </section>
        <Collapse in={filtersOpen}>
          <div className="mb-2 flex w-full flex-col flex-wrap gap-2 sm:flex sm:flex-row sm:items-center">
            <div className="flex gap-x-1 overflow-x-scroll  sm:order-2 sm:w-[60%]">
              {techFocusAreas.map((area) => (
                <Chip key={area} className="mt-4 ">
                  {area}
                </Chip>
              ))}
            </div>
            <TextInput radius="xl" className="sm:w-[20%]" rightSection={<BsSearch className="flex-1 text-teksade " />} />
            <Select radius="xl" data={countries} searchable placeholder="Country" className="flex-1 sm:order-3 sm:w-[20%]" value={selectedCountry} onChange={(val) => setSelectedCountry(val!)} />
          </div>
        </Collapse>
      </div>

      <section className="grid grid-cols-1 gap-1 gap-x-2 sm:grid-cols-3 md:grid-cols-4 ">
        {communitiesList.data?.map((communinty) => (
          <CommmunityCard id={communinty.id} key={communinty.id} name={communinty.name} country={communinty.country} location={communinty.location} description={communinty.description} members={communinty._count.members} logoUrl={communinty.logo_link} />
        ))}
      </section>
    </div>
  );
}
