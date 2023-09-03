/* eslint-disable @next/next/no-img-element */
import { techFocusAreas } from "@/utils/constants";
import { Button, Chip, LoadingOverlay, Paper, rem, Text, Tooltip } from "@mantine/core";
import React, { useState } from "react";
import { Carousel } from "@mantine/carousel";
import Link from "next/link";
import { api } from "@/utils/api";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { ref } from "firebase/storage";
import { storageBucket } from "@/utils/firestoreConfig";
import Container from "@/components/custom-components/container";
import Checkmark from "@/components/custom-components/checkmark";
import LocationIcon from "../custom-components/locationIcon";
import { useMantineColorScheme } from "@mantine/core";
import CustomButton from "@/components/custom-components/button";

const verificationTooltip = "Endorsed for its official connection with the named organization, this community is proudly verified.";

export default function PopularCommunities() {
  const popularCommunities = api.communities.getPopularCommunities.useQuery();
  const [selectedTechnlogies, setselectedTechnlogies] = useState(["JavaScript", "React", "Django", "Laravel"]);
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <Container>
      <div id="popular" className="py-20 ">
        <p className="flex w-full items-center justify-between text-xl font-bold">
          <span className="">Popular Communities</span>{" "}
          <Link href="/communities">
            <CustomButton size="sm" variant="outline" title="Show All" />
          </Link>
        </p>
        <div className="mt-8 flex gap-2 overflow-x-scroll ">
          <Chip.Group multiple value={selectedTechnlogies} onChange={setselectedTechnlogies}>
            <Chip value="All">ALL</Chip>
            {["All", ...techFocusAreas].map((tech) => (
              <Chip key={tech} value={tech}>
                {tech}
              </Chip>
            ))}
          </Chip.Group>
        </div>
        <div className="overflow-x-auto">
          <Carousel
            slideGap="md"
            loop
            align="start"
            slidesToScroll={1}
            controlsOffset="1%"
            controlSize={30}
            slideSize="33.33%"
            breakpoints={[{ maxWidth: "sm", slideSize: "100%", slideGap: rem(2) }]}
            className="my-5 "
          >
            {popularCommunities.data?.map((community) => (
              <Carousel.Slide key={community.id} className="w-60 pb-10">
                <Link href={`/communities/${community.id}`}>
                  <Paper className="h-full rounded-lg shadow-lg">
                    <div className="">
                      <CommunityImage communityName={community.name.split(" ").join("")} />
                    </div>
                    <div className="p-2">
                      <Text color="dimmed" className="flex items-center py-2 text-xs font-bold">
                        <LocationIcon />
                        {community.country} , {community.location}
                      </Text>
                      <div className="flex items-center">
                        <h3 className="mr-2 flex items-center justify-between">{community.name}</h3>
                        {community.verified && (
                          <Tooltip withArrow label={verificationTooltip} arrowSize={5}>
                            <Text>
                              <Checkmark />
                            </Text>
                          </Tooltip>
                        )}
                      </div>
                      <div className="mt-2 flex flex-wrap items-center">
                        {community.technologies.slice(0, 10).map((tech) => (
                          <Chip key={tech} value={tech} className="mb-1 mr-0.5 ">
                            <p className={`${dark ? "text-[#00afef]" : "text-[#1A56DB]"}`}>{tech}</p>
                          </Chip>
                        ))}
                      </div>
                    </div>
                  </Paper>
                </Link>
              </Carousel.Slide>
            ))}
          </Carousel>
        </div>
      </div>
    </Container>
  );
}

function CommunityImage({ communityName }: { communityName: string }) {
  const [value, loading] = useDownloadURL(ref(storageBucket, `logos/${communityName}`));

  return (
    <div className="">
      <LoadingOverlay visible={loading} />
      <img src={value ? value : "/img/g-1.jpg"} alt="community log" className="h-60 w-full rounded-t-lg object-cover" />
    </div>
  );
}
