/* eslint-disable @next/next/no-img-element */
import { api } from "@/utils/api";
import { Button, Chip, Collapse, Menu, Select, TextInput } from "@mantine/core";
import { BsFilter, BsFire, BsSearch } from "react-icons/bs";
import { VscDiffAdded } from "react-icons/vsc";
import React from "react";
import CommmunityCard from "@/components/sections/CommmunityCard";
import { useDisclosure } from "@mantine/hooks";
import { countries, techFocusAreas } from "@/utils/constants";

export default function CommunitiesPage() {
  const communitiesList = api.communities.getCommunitiesList.useQuery({ limit: 50 });
  const [filtersOpen, { toggle }] = useDisclosure(false);

  return (
    <div className="container p-2 mx-auto">
      <div className="">
        <section className="flex items-center justify-between w-full my-2 ">
          <Menu>
            <Menu.Target>
              <Button variant="subtle" rightIcon={<BsFilter />} className="flex items-center p-2 px-4 shadow-lg gap-x-2">
                Popularity
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item icon={<BsFire />}>Popular</Menu.Item>
              <Menu.Item icon={<VscDiffAdded />}>Newly Created</Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <Button onClick={toggle} variant="subtle" rightIcon={<BsFilter />} className="flex items-center p-2 px-4 shadow-lg gap-x-2">
            Filters
          </Button>
        </section>
        <Collapse in={filtersOpen}>
          <div className="flex flex-col flex-wrap w-full gap-2 mb-2 sm:flex sm:flex-row sm:items-center">
            <div className="flex gap-x-1 overflow-x-scroll  sm:order-2 sm:w-[60%]">
              {techFocusAreas.map((area) => (
                <Chip key={area} className="mt-4 ">
                  {area}
                </Chip>
              ))}
            </div>
            <TextInput radius="xl" className="sm:w-[20%]" rightSection={<BsSearch className="flex-1 text-teksade " />} />
            <Select radius="xl" data={countries} searchable placeholder="Country" className="flex-1 sm:order-3 sm:w-[20%]" />
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
