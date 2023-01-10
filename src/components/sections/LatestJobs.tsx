import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FreeMode, Mousewheel, Navigation, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "@/components/Button";
import { Chip } from "@/components/Chip";

const latestJobsCategories = [
  "IT - Software Development",
  "Customer Service",
  "Human Resources",
  "Other",
  "Accounting & Finance",
  "Marketing - Digital",
  "Creative Writing",
  "Sales (Corporate, Real Estate, Telesales, etc.)",
  "Project Management",
];

const latestJobsItems = [
  {
    companyName: "Rempel and Sons",
    jobTitle: "Computer Systems Analyst I",
    image: "/img/08.jpg",
  },
  {
    companyName: "Dietrich, Beahan and Connelly",
    jobTitle: "VP Quality Control",
    image: "/img/09.jpg",
  },
  {
    companyName: "Gutmann LLC",
    jobTitle: "Quality Engineer",
    image: "/img/10.jpg",
  },
  {
    companyName: "Kerluke Group",
    jobTitle: "Actuary",
    image: "/img/11.jpg",
  },
  {
    companyName: "Hahn LLC",
    jobTitle: "Environmental Specialist",
    image: "/img/12.jpg",
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
];

export const LatestJobs = () => {
  return (
    <section id="latest-jobs">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Recently Added</h2>
        <Button variant="outline" className="hidden xs:inline-flex">
          Show All
        </Button>
      </div>
      <div id="latest-jobs__categories" className="mb-4">
        <Swiper
          modules={[FreeMode, Scrollbar, Mousewheel]}
          direction="horizontal"
          freeMode={true}
          mousewheel={true}
          scrollbar={{ draggable: true, hide: true }}
          slidesPerView="auto"
          spaceBetween={8}
          id="latest-jobs__categories__slider"
          className="!py-4"
        >
          <SwiperSlide className="!w-auto">
            <Chip label="all" active />
          </SwiperSlide>
          {latestJobsCategories.map((item, i) => (
            <SwiperSlide key={i} className="!w-auto">
              <Chip label={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* !-m-4 to fix box-shadow cropping due to overflow:hidden */}
      <div id="latest-jobs__items" className="!-m-4">
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
          {latestJobsItems.map((item, i) => (
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
