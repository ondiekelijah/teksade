"use client"
import Image from "next/image";
import Link from "next/link";
import { FreeMode, Mousewheel, Navigation, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "@/components/Button";
import { Chip } from "@/components/Chip";



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

const featuredGroups = [
  {
    id: 1, // Unique ID for the group
    tags: ["#Open-Source", "#Africa", "#SpaceYaTech", "#TwitterSpaces"], // Diversified tags to be used for filtering: Programming Languages, Frameworks, Technologies, etc.
    group: "Space ya Tech", // Community name
    images: [ // an array of images
      { id: 1, src: "/img/groups/space-ya-tech/space-ya-tech.jpg", alt: "image", width: 100, height: 100, },
      { id: 2, src: "/img/groups/space-ya-tech/space-ya-tech-2.jpg", alt: "image", width: 100, height: 100, },
      { id: 3, src: "/img/groups/space-ya-tech/space-ya-tech-3.jpg", alt: "image", width: 100, height: 100, },
    ],

  },
  {
    id: 2,
    tags: ["#Open-Source", "#Figma", "#UI/UX", "#TwitterSpaces"],
    group: "Friends of Figma, Nairobi",
    images: [
      { id: 1, src: "/img/groups/fof/fof-1.jpg", alt: "image", width: 100, height: 100, },
      { id: 2, src: "/img/groups/fof/fof-2.jpg", alt: "image", width: 100, height: 100, },
      { id: 3, src: "/img/groups/fof/fof.jpg", alt: "image", width: 100, height: 100, },
    ],
  },
  {
    id: 3,
    tags: ["#PhyicalEvents", "#Mentorship", "#SoftwareEngineeering", "#TwitterSpaces"],
    group: "Lux Tech Academy",
    images: [
      { id: 1, src: "/img/groups/lux-tech/lux-tech-1.jpg", alt: "image", width: 100, height: 100, },
      { id: 2, src: "/img/groups/lux-tech/lux-tech-2.jpg", alt: "image", width: 100, height: 100, },
      { id: 3, src: "/img/groups/lux-tech/lux-tech.jpg", alt: "image", width: 100, height: 100, },
    ],
  },
  {
    id: 4,
    tags: ["#Kotlin", "#Kotlin254", "#Android", "#TwitterSpaces"],
    group: "Kotlin254",
    images: [
      { id: 1, src: "/img/groups/kotlin254/kot-1.webp", alt: "image", width: 100, height: 100, },
      { id: 2, src: "/img/groups/kotlin254/kot-2.webp", alt: "image", width: 100, height: 100, },
      { id: 3, src: "/img/groups/kotlin254", alt: "image", width: 100, height: 100, },
    ],
  },
];


// flex fixed top-0 z-10 w-full items-center gap-4 bg-white/80 py-1 px-5 shadow

export const RecentlyAdded = () => {

  return (
    <section id="featured-jobs" className="flex flex-col items-center justify-center min-h-[80vh] mx-auto max-w-screen-xl">
      {/* relative w-full h-screen font-sans text-gray-900 flex items-center justify-center' */}
      <div className="flex items-center justify-between w-full mb-5">
        <h2 className="text-2xl font-bold">Recently Added</h2>
        <Button variant="outline" className="hidden xs:inline-flex">
          Show All
        </Button>
      </div>
      <div id="featured-jobs__categories" className="w-full mb-10">
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
      <div id="featured-jobs__items" className="!-m-4 w-full">
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
          {featuredGroups.map((group, i) => (
            <SwiperSlide key={i}>
              <Link
                href="/community"
                className="block overflow-hidden transition-all duration-150 bg-white border shadow-md group rounded-2xl border-slate-200 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-700">

                <div className="relative block overflow-hidden  pt-[70%]">
                  <Image
                    src={group.images[0].src}
                    alt={group.images[0].alt}
                    className="transition-all duration-200 group-hover:scale-[102%]"
                    fill
                    sizes="100vw"
                    style={{
                      objectFit: "cover"
                    }} />
                </div>
                <div className="flex flex-col p-4 border-t dark:border-slate-600">
                  <h5 className="block text-xl font-semibold capitalize truncate">
                    {group.group}
                  </h5>
                  <span className="block text-sm truncate text-slate-500 dark:text-slate-400">
                    {group.tags.map((tag, i) => (
                      <span key={i} className="mr-1">
                        {tag}
                      </span>
                    ))}
                  </span>
                </div>

              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};


