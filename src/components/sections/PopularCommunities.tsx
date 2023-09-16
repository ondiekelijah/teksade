/* eslint-disable @next/next/no-img-element */
import { techFocusAreas } from "@/utils/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button, Chip, LoadingOverlay, Paper, rem, Text, Tooltip } from "@mantine/core";
import React, { useRef, useState } from "react";
import { Carousel } from "@mantine/carousel";
import Link from "next/link";
import { api } from "@/utils/api";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { ref } from "firebase/storage";
import { storageBucket } from "@/utils/firestoreConfig";
import Container from "@/components/custom-components/container";
import Checkmark from "@/components/custom-components/icons/checkmark";
import LocationIcon from "../custom-components/icons/locationIcon";
import { useMantineColorScheme } from "@mantine/core";
import CustomButton from "@/components/custom-components/button";
import CommunityCardSkeleton from "../custom-components/skeletons/Community/CommunityCard";
import siteMetadata from "@/data/siteMetadata";
import { NextIcon, PrevIcon } from "../custom-components/icons/navigationIcons";

export default function PopularCommunities() {
  const defaultList = ["All"];
  const [selectedTechnlogies, setselectedTechnlogies] = useState(defaultList);
  const popularCommunities = api.communities.getPopularCommunities.useQuery({
    focus_area: selectedTechnlogies,
  });
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainer = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (scrollContainer.current) {
      const containerWidth = scrollContainer.current.offsetWidth;
      scrollContainer.current.scrollBy({
        left: containerWidth,
        behavior: "smooth",
      });
      setScrollPosition(scrollContainer.current.scrollLeft);
    }
  };
  
  const handlePrev = () => {
    if (scrollContainer.current) {
      const containerWidth = scrollContainer.current.offsetWidth;
      scrollContainer.current.scrollBy({
        left: -containerWidth,
        behavior: "smooth",
      });
      setScrollPosition(scrollContainer.current.scrollLeft);
    }
  };
  

  return (
    <Container>
      <div id="popular" className="py-20 ">
        <p className="flex w-full items-center justify-between text-xl font-bold">
          <span className="">Popular Communities</span>{" "}
          <Link href="/communities">
            <CustomButton size="sm" variant="outline" title="Show All" />
          </Link>
        </p>
        {/* Scrollable chips */}
        <div className=" flex items-center gap-2 pt-4">
          <button onClick={handlePrev}>
            <PrevIcon size={30} />
          </button>
          <div ref={scrollContainer} className="hide-scrollbar flex gap-2 overflow-x-auto">
            <Chip.Group
              multiple
              value={selectedTechnlogies}
              onChange={(value) => {
                // If 'All' is in the new selection and the previous value was not 'All'
                if (value.includes("All") && !selectedTechnlogies.includes("All")) {
                  setselectedTechnlogies(["All"]);
                }
                // If 'All' was deselected, no changes
                else if (!value.includes("All") && selectedTechnlogies.includes("All")) {
                  return;
                }
                // If the user selects any other option when "All" is present
                else if (value.length > selectedTechnlogies.length) {
                  setselectedTechnlogies(value.filter((item) => item !== "All"));
                }
                // If the user deselects any option other than "All"
                else {
                  setselectedTechnlogies(value);
                }

                // If nothing is selected, default to "All"
                if (value.length === 0) {
                  setselectedTechnlogies(["All"]);
                }
              }}
            >
              {["All", ...techFocusAreas].map((tech, index) => (
                <Chip key={tech} value={tech} checked={selectedTechnlogies.includes(tech)} color="indigo" variant={selectedTechnlogies.includes(tech) ? "filled" : "outline"}>
                  {tech}
                </Chip>
              ))}
            </Chip.Group>
          </div>
          <button onClick={handleNext}>
            <NextIcon size={30} />
          </button>
        </div>
        {/*  */}
        <div className="overflow-x-auto">
          {!popularCommunities.isLoading && popularCommunities.data?.length === 0 ? (
            <div className="flex h-60 w-full items-center justify-center px-20 text-center">
              <Text>
                Hmmm... No communities seem to fit the
                <span className={`${dark ? "text-[#00afef]" : "text-[#1A56DB]"}`}> {selectedTechnlogies.join(", ")} </span>
                filter. Want to explore other categories?
              </Text>
            </div>
          ) : (
            <Carousel
              slideGap="md"
              loop
              dragFree
              align="start"
              slidesToScroll={1}
              controlsOffset="1%"
              controlSize={30}
              slideSize="33.33%"
              breakpoints={[{ maxWidth: "sm", slideSize: "100%", slideGap: rem(2) }]}
              className="my-5 "
              nextControlIcon={<NextIcon hideCircle={true} />}
              previousControlIcon={<PrevIcon hideCircle={true} />}
            >
              {popularCommunities.isLoading && (
                <>
                  <Carousel.Slide key={1} className="w-60 pb-10">
                    <CommunityCardSkeleton showTags={true} />
                  </Carousel.Slide>
                  <Carousel.Slide key={2} className="w-60 pb-10">
                    <CommunityCardSkeleton showTags={true} />
                  </Carousel.Slide>
                  <Carousel.Slide key={3} className="w-60 pb-10">
                    <CommunityCardSkeleton showTags={true} />
                  </Carousel.Slide>
                </>
              )}
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
                            <Tooltip withArrow label={siteMetadata.verificationTooltip} arrowSize={5}>
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
          )}
        </div>
      </div>
    </Container>
  );
}

function CommunityImage({ communityName }: { communityName: string }) {
  const [value, loading] = useDownloadURL(ref(storageBucket, `logos/${communityName}`));

  return (
    <div className="">
      {/* <LoadingOverlay visible={loading} /> */}
      <img src={value ? value : "/img/twitter-card.svg"} alt="community log" className="h-60 w-full rounded-t-lg object-cover" />
    </div>
  );
}
