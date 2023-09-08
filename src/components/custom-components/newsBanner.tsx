import React, { FC } from "react";
import { Box, useMantineColorScheme } from "@mantine/core";
import { useRouter } from "next/router";

interface Announcement {
  created_at: Date;
  updated_at: Date;
  title: string;
  content: string;
  link: string;
  published: boolean;
  isAdvertisement: boolean;
  targetPage: string;
  duration: number;
  linkedText: string;
}

interface StickyBannerProps {
  announcement: Announcement | undefined; // This explicitly allows it to be undefined
  onClose: () => void;
  onOpen?: () => void;
}

const StickyBanner: FC<StickyBannerProps> = ({ announcement, onClose, onOpen }) => {
  // Get current path and match with targetPage
  const router = useRouter();
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  if (!announcement) return null; // or handle it however you'd like

  const { title, content, link, published, isAdvertisement, targetPage = "all", duration, linkedText, created_at } = announcement;

  // Calculate if announcement has expired
  const currentDate = new Date();
  const createdDate = new Date(created_at);
  const expireDate = new Date(createdDate.setDate(createdDate.getDate() + duration));
  const isExpired = currentDate > expireDate;

  // Create a message with dynamic link
  const message = content.replace(
    linkedText,
    `<a target="_blank" href="${link}" class="${dark ? 'decoration-500 text-[#00afef]' : 'decoration-600 text-indigo-600'} underline decoration-solid underline-offset-2 hover:no-underline">${linkedText}</a>`
  );
  

  // Conditions to display the banner
  if (!published || isExpired || (targetPage !== "all" && router.pathname !== targetPage)) return null;

  // Get current path, use it to style the banner appropriately.
  const isCommunitiesPage = router.pathname === "/communities";

  return (
    <Box className={`left-0 flex ${isCommunitiesPage ? "top-2 mt-3 w-full" : "top-0 w-fit"} justify-between rounded-full border-b p-4 ${dark ? " bg-gray-700" : " bg-gray-200"}`}>
      <div className="mx-auto flex items-center">
        <p className={`flex items-center text-sm font-normal ${dark ? "text-slate-400" : "text-slate-600"}`}>
          <span className={`mr-3 inline-flex h-6 w-6 items-center justify-center rounded-full  p-1 ${dark ? "bg-gray-600" : "bg-gray-200"}`}>
            <svg className={`h-3 w-3 ${dark ? "text-slate-400" : "text-slate-600"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill={"#00afef"} viewBox="0 0 18 19">
              <path d="M15 1.943v12.114a1 1 0 0 1-1.581.814L8 11V5l5.419-3.871A1 1 0 0 1 15 1.943ZM7 4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2v5a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V4ZM4 17v-5h1v5H4ZM16 5.183v5.634a2.984 2.984 0 0 0 0-5.634Z" />
            </svg>
            <span className="sr-only">Light bulb</span>
          </span>
          <span>
            <span className="font-bold">{title}</span> <span dangerouslySetInnerHTML={{ __html: message }} className={` text-sm font-normal ${dark ? "text-slate-400" : "text-slate-600"}`}></span>
          </span>
        </p>
      </div>
      <div className="ml-4 flex items-center">
        <span className="inline-flex h-7 w-7 flex-shrink-0 cursor-pointer items-center justify-center" onClick={onClose}>
          <svg className="h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill={"#00afef"} viewBox="0 0 14 14">
            <path stroke="#00afef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
          <span className="sr-only">Close banner</span>
        </span>
      </div>
    </Box>
  );
};

export default StickyBanner;

// Usage example:
// <StickyBanner
//   message="New brand identity has been launched for the"
//   link="https://flowbite.com"
//   content="Flowbite Library"
//   onClose={() => {
//     console.log('Banner closed!');
//   }}
// />
