/* eslint-disable @next/next/no-img-element */
import { techFocusAreas } from "@/utils/constants";
import { Button, Chip, LoadingOverlay, Paper, rem } from "@mantine/core";
import React, { useState } from "react";
import { Carousel } from "@mantine/carousel";
import Link from "next/link";
import { api } from "@/utils/api";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { ref } from "firebase/storage";
import { storageBucket } from "@/utils/firestoreConfig";
import Container from "@/components/custom-components/container";
import Checkmark from "@/components/custom-components/checkmark";
import { ChevronLeft, ChevronRight } from "../custom-components/controllers";

export default function PopularCommunities() {
  const popularCommunities = api.communities.getPopularCommunities.useQuery();
  const [selectedTechnlogies, setselectedTechnlogies] = useState(["JavaScript", "React", "Django", "Laravel"]);

  return (
    <Container>
      <div id="popular" className="min-h-[90vh] py-20 ">
        <p className="flex w-full items-center justify-between text-xl font-bold">
          <span className="">Popular Communities</span>{" "}
          <Link href="communities">
            <Button className="rounded-full " size="sm">
              Show All
            </Button>
          </Link>
        </p>
        <div className="my-3 flex gap-2 overflow-x-scroll ">
          <Chip.Group multiple value={selectedTechnlogies} onChange={setselectedTechnlogies}>
            <Chip value="All">ALL</Chip>
            {["All", ...techFocusAreas].map((tech) => (
              <Chip key={tech} value={tech}>
                {tech}
              </Chip>
            ))}
          </Chip.Group>
        </div>
        <div className="overflow-x-auto py-3">
          <Carousel
            slideGap="md"
            loop
            align="start"
            slidesToScroll={1}
            controlsOffset="3%"
            slideSize="33.33%"
            breakpoints={[{ maxWidth: "sm", slideSize: "100%", slideGap: rem(2) }]}
            className="my-5 "
            nextControlIcon={<ChevronRight size={40} />}
            previousControlIcon={<ChevronLeft size={40} />}
          >
            {popularCommunities.data?.map((community) => (
              <Carousel.Slide key={community.id} className="w-60 pb-10">
                <Link href={`/communities/${community.id}`}>
                  <Paper withBorder className="h-full rounded-lg shadow-xl">
                    <div className="">
                      <CommunityImage communityName={community.name.split(" ").join("")} />
                    </div>
                    <div className="p-2">
                      <div className="flex items-center">
                        <h3 className="mr-2 flex items-center justify-between">{community.name}</h3>
                        <Checkmark />
                      </div>
                      <div className="mt-2 flex flex-wrap items-center">
                        {community.technologies.map((tech) => (
                          <Chip key={tech} value={tech} className="mb-1 mr-1">
                            {tech}
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
