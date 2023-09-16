import React, { FC, useEffect, useState } from "react";
import { api } from "@/utils/api";
import { Box, useMantineColorScheme } from "@mantine/core";
import { useRouter } from "next/router";

const StickyBanner = () => {
  const router = useRouter();
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const announcements = api.announcements.getAnnouncements.useQuery();
  const announcement = announcements.data?.[0];

  // Initialize a state variable for the last closed announcement
  const [lastClosedAnnouncement, setLastClosedAnnouncement] = useState<string | null>(null);

  // Only show the banner if the latest announcement hasn't been closed yet
  const [showBanner, setShowBanner] = useState(true);

  // Effect to get the stored value from localStorage once after the component mounts
  useEffect(() => {
    const storedValue = localStorage.getItem("lastClosedAnnouncement");
    setLastClosedAnnouncement(storedValue);
    
    if (announcement && storedValue === announcement.created_at.toString()) {
      setShowBanner(false);
    }
  }, [announcement]);

  if (!announcement) return null;

  const { title, content, link, published, isAdvertisement, targetPage = "all", duration, linkedText, created_at } = announcement;

  const currentDate = new Date();
  const createdDate = new Date(created_at);
  const expireDate = new Date(createdDate.setDate(createdDate.getDate() + duration));
  const isExpired = currentDate > expireDate;

  const message = content.replace(
    linkedText,
    `<a target="_blank" href="${link}" class="${
      dark ? "decoration-500 text-[#00afef]" : "decoration-600 text-indigo-600"
    } underline decoration-solid underline-offset-2 hover:no-underline">${linkedText}</a>`
  );

  if (!published || isExpired || (targetPage !== "all" && router.pathname !== targetPage)) return null;

  const bgColor = dark ? "bg-gray-700" : "bg-gray-200";
  const textColor = dark ? "text-slate-400" : "text-slate-600";
  const bulbBgColor = dark ? "bg-gray-600" : "bg-gray-200";

  const handleCloseBanner = () => {
    if (announcement) {
      localStorage.setItem("lastClosedAnnouncement", announcement.created_at.toString());
      setShowBanner(false);
    }
  };

  const LightBulbIcon = () => (
    <svg className={`h-3 w-3 ${textColor}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="#00afef" viewBox="0 0 18 19">
      <path d="M15 1.943v12.114a1 1 0 0 1-1.581.814L8 11V5l5.419-3.871A1 1 0 0 1 15 1.943ZM7 4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2v5a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V4ZM4 17v-5h1v5H4ZM16 5.183v5.634a2.984 2.984 0 0 0 0-5.634Z" />
    </svg>
  );

  const CloseIcon = () => (
    <svg className="h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="#00afef" viewBox="0 0 14 14">
      <path stroke="#00afef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
    </svg>
  );

  if (!showBanner) return null;

  return (
    <Box className={`text-muted-foreground flex items-center justify-center p-1 text-center ${bgColor} w-full`}>
      <div className="mx-auto flex items-center">
        <p className={`flex items-center text-sm font-normal ${textColor}`}>
          <span className={`mr-3 hidden h-6 w-6 items-center justify-center rounded-full p-1 lg:block ${bulbBgColor}`}>
            <LightBulbIcon />
            <span className="sr-only">Light bulb</span>
          </span>
          <span>
            <span className="mr-1 font-bold">{title}</span>
            <span dangerouslySetInnerHTML={{ __html: message }} className={`text-sm font-normal ${textColor}`}></span>
          </span>
        </p>
      </div>
      <div className="ml-4 flex items-center">
        <span className="inline-flex h-7 w-7 flex-shrink-0 cursor-pointer items-center justify-center" onClick={handleCloseBanner}>
          <CloseIcon />
          <span className="sr-only">Close banner</span>
        </span>
      </div>
    </Box>
  );
};

export default StickyBanner;
