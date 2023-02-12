import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FreeMode, Mousewheel, Navigation, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "@/components/Button";
import { Chip } from "@/components/Chip";

import { GraphQLClient } from 'graphql-request';
import { gql } from 'graphql-request';


const communitiesCategories = [
  "Android",
  "Angular",
  "Artificial Intelligence",
  "Blockchain",
  "C#",
  "C++",
  "CSS",
  "Data Science",
  "DevOps",
  "Django",
  "Elixir",
  "Flutter",
  "Go",
  "GraphQL",
  "HTML",
  "iOS",
  "Java",
  "JavaScript",
  "Kotlin",
  "Laravel",
  "Machine Learning",
  "Node.js",
  "PHP",
  "Python",
  "React",
  "React Native",
  "Ruby",
  "Rust",
  "Salesforce",
  "Scala",
  "Swift",
  "TypeScript",
  "Vue.js",
  "Web Development",
  "WordPress",
];

const featuredJobsItems = [
  {
    companyName: "Kerluke Group",
    jobTitle: "Savanna Silca",
    image: "/img/01.jpg",
  },
  {
    companyName: "Witting, Bauch and Cartwright",
    jobTitle: "Space ya Tech",
    image: "/img/02.jpg",
  },
  {
    companyName: "Hahn LLC",
    jobTitle: "Kotlin 254",
    image: "/img/03.jpg",
  },
  {
    companyName: "Ziemann, Nicolas and Grady",
    jobTitle: "Web Designer IV",
    image: "/img/04.jpg",
  },
  {
    companyName: "Bernhard and Sons",
    jobTitle: "Teacher",
    image: "/img/05.jpg",
  },
  {
    companyName: "Kassulke, Reynolds and Armstrong",
    jobTitle: "Structural Analysis Engineer",
    image: "/img/06.jpg",
  },
  {
    companyName: "Kihn-Jast",
    jobTitle: "Technical Writer",
    image: "/img/07.jpg",
  },
];

// flex fixed top-0 z-10 w-full items-center gap-4 bg-white/80 py-1 px-5 shadow

export const PopularCommunities = () => {
  
  return (

    <section id="featured-jobs">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Popular Communities</h2>
        <Button variant="outline" className="hidden xs:inline-flex">
          Show All
        </Button>
      </div>
      <div id="featured-jobs__categories" className="mb-4">
        <Swiper
          modules={[FreeMode, Scrollbar, Mousewheel]}
          direction="horizontal"
          freeMode={true}
          mousewheel={true}
          scrollbar={{ draggable: true, hide: true }}
          slidesPerView="auto"
          spaceBetween={8}
          id="featured-jobs__categories__slider"
          className="!py-4"
        >
          <SwiperSlide className="!w-auto">
            <Chip label="all" active />
          </SwiperSlide>
          {communitiesCategories.map((item, i) => (
            <SwiperSlide key={i} className="!w-auto">
              <Chip label={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* !-m-4 to fix box-shadow cropping due to overflow:hidden */}
      <div id="featured-jobs__items" className="!-m-4">
        <Swiper
          className="!p-4" // !p-4 to fix box-shadow cropping due to overflow:hidden
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            "475": {
              slidesPerView: 2,
            },
            "640": {
              slidesPerView: 3,
            },
            "1024": {
              slidesPerView: 4,
            },
          }}
        >
          {featuredJobsItems.map((item, i ) => (
            <SwiperSlide key={i}>
              <Link href="/#">
                <a className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-all duration-150 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-700">
                  <div className="relative block overflow-hidden  pt-[70%]">
                    <Image
                      src={item.image}
                      alt={item.companyName}
                      layout="fill"
                      objectFit="cover"
                      className="transition-all duration-200 group-hover:scale-[102%]"
                    />
                  </div>

                  <div className="flex flex-col border-t p-4 dark:border-slate-600">
                    <h5 className="block truncate text-xl font-semibold capitalize">
                      {item.jobTitle}
                    </h5>
                    <span className="block truncate text-slate-500 dark:text-slate-400">
                      {item.companyName}
                    </span>
                  </div>
                </a>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};


