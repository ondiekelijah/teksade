import React, { FC } from "react";
import { useMantineColorScheme } from "@mantine/core";
import { useRouter } from "next/router";

interface StickyBannerProps {
  message: string;
  link: string;
  linkText: string;
  onClose: () => void;
  onOpen?: () => void;
}

const StickyBanner: FC<StickyBannerProps> = ({ message, link, linkText, onClose, onOpen }) => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  // Get current path, use it to style the banner appropriately.
  const router = useRouter();
  const isCommunitiesPage = router.pathname === "/communities";

  return (
    <div
      className={`left-0 z-50 flex ${isCommunitiesPage ? "top-2 mt-3 w-full" : "top-0 w-fit"} justify-between rounded-full border-b p-4 ${
        dark ? "border-gray-600 bg-gray-700" : "border-gray-200 bg-gray-200"
      }`}
    >
      <div className="mx-auto flex items-center">
        <p className={`flex items-center text-sm font-normal ${dark ? "text-slate-400" : "text-slate-600"}`}>
          <span className={`mr-3 inline-flex h-6 w-6 items-center justify-center rounded-full  p-1 ${dark ? "bg-gray-600" : "bg-gray-200"}`}>
            <svg className={`h-3 w-3 ${dark ? "text-slate-400" : "text-slate-600"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill={"#00afef"} viewBox="0 0 18 19">
              <path d="M15 1.943v12.114a1 1 0 0 1-1.581.814L8 11V5l5.419-3.871A1 1 0 0 1 15 1.943ZM7 4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2v5a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V4ZM4 17v-5h1v5H4ZM16 5.183v5.634a2.984 2.984 0 0 0 0-5.634Z" />
            </svg>
            <span className="sr-only">Light bulb</span>
          </span>
          <span>
            {message}{" "}
            <a
              href={link}
              className={`inline font-medium ${dark ? "decoration-500 text-[#00afef]" : "decoration-600 text-indigo-600"} underline decoration-solid underline-offset-2 hover:no-underline`}
            >
              {linkText}
            </a>
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
    </div>
  );
};

export default StickyBanner;

// Usage example:
// <StickyBanner
//   message="New brand identity has been launched for the"
//   link="https://flowbite.com"
//   linkText="Flowbite Library"
//   onClose={() => {
//     console.log('Banner closed!');
//   }}
// />
