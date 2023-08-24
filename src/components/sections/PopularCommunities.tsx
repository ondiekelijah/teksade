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

export default function PopularCommunities() {
  const popularCommunities = api.communities.getPopularCommunities.useQuery();
  const [selectedTechnlogies, setselectedTechnlogies] = useState(["JavaScript", "React", "Django", "Laravel"]);

  return (
    <Container>
      <div id="popular" className="min-h-[80vh] pt-20 ">
        <p className="flex w-full justify-between text-xl font-bold ">
          <span className="">Popular Communities</span>{" "}
          <Link href="communities">
            <Button className="rounded-full " size="sm">Show All</Button>
          </Link>
        </p>
        <div className="my-3 flex gap-2 overflow-x-scroll ">
          <Chip.Group multiple value={selectedTechnlogies} onChange={setselectedTechnlogies}>
            <Chip value="All" variant="filled">
              ALL
            </Chip>
            {["All", ...techFocusAreas].map((tech) => (
              <Chip key={tech} value={tech} variant="filled">
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
          >
            {popularCommunities.data?.map((community) => (
              <Carousel.Slide key={community.id} className="w-60 rounded  shadow-xl">
                <Link href={`/communities/${community.id}`}>
                  <Paper withBorder className="h-full ">
                    <div className="">
                      <CommunityImage communityName={community.name.split(" ").join("")} />
                    </div>
                    <div className="p-2 ">
                      <h3 className="flex items-center justify-between ">{community.name}</h3>
                      <div className="flex items-center  overflow-x-scroll ">
                        {community.technologies.map((tech) => (
                          <span className="flex" key={tech}>
                            #{tech.split(" ")}
                          </span>
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
  const [value, loading] = useDownloadURL(ref(storageBucket, communityName));

  return (
    <div className="">
      <LoadingOverlay visible={loading} />
      <img src={value ? value : "/img/g-1.jpg"} alt="community log" className="h-60 w-full object-cover" />
    </div>
  );
}
