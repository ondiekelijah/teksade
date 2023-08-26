import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "@mantine/core";
import { FaTwitter, FaGithub, FaYoutube, FaLinkedin, FaWhatsapp, FaGlobe, FaPhone, FaUserFriends, FaMapMarkedAlt } from "react-icons/fa";
import { Group, ActionIcon, rem, Text, Tooltip, Chip } from "@mantine/core";
import { api } from "@/utils/api";
import Checkmark from "../custom-components/checkmark";
import Image from "next/image";
import { useMantineColorScheme } from "@mantine/core";
import { CommunitySEO } from "../SEO";

const verificationTooltip = "Endorsed for its official connection with the named organization, this community is proudly verified.";

interface VerificationTooltipProps {
  verified?: boolean | null;
}

interface SocialLinksProps {
  links: {
    twitter: string;
    github: string;
    linkedin: string;
    website: string;
    whatsapp: string;
    phone: string;
    [key: string]: string | undefined;
  };
}

interface TechnologiesProps {
  technologies: string[];
  dark: boolean;
}


const VerificationTooltip = ({ verified }: VerificationTooltipProps) => {
  return verified ? (
    <Tooltip withArrow label={verificationTooltip} arrowSize={5}>
      <Text>
        <Checkmark />
      </Text>
    </Tooltip>
  ) : null;
};

const SocialLinks = ({ links }: SocialLinksProps) => {
  const icons = {
    twitter: FaTwitter,
    github: FaGithub,
    linkedin: FaLinkedin,
    website: FaGlobe,
    whatsapp: FaWhatsapp,
    phone: FaPhone,
  };
  return (
    <Group spacing="xs" noWrap className="my-6">
      {Object.entries(icons).map(([key, Icon]) => (
        <Link key={key} href={links[key] ?? " "} passHref>
          <ActionIcon size="lg" variant="default" radius="xl">
            <Icon />
          </ActionIcon>
        </Link>
      ))}
    </Group>
  );
};

const Technologies = ({ technologies, dark }: TechnologiesProps) => {
  const textColor = dark ? "text-[#00afef]" : "text-[#1A56DB]";
  return (
    <div className="mt-7 flex flex-wrap items-center">
      {technologies.map((tech) => (
        <Chip key={tech} value={tech} className="mb-2 mr-2">
          <p className={textColor}>{tech}</p>
        </Chip>
      ))}
    </div>
  );
};

const CommunityPage = () => {
  const communityId = useRouter().query.id;
  const community = api.communities.getCommunityDetails.useQuery({ communityId: communityId as string });
  // console.log(community.data); // uncomment to see the data in the console: for development purposes only
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const linksData = {
    twitter: community.data?.twitter ?? "",
    github: community.data?.github ?? "",
    linkedin: community.data?.linkedin ?? "",
    website: community.data?.website ?? "",
    whatsapp: community.data?.whatsapp ?? "",
    phone: community.data?.phone ?? "",
  };

  return (
    <>
      <CommunitySEO
        name={community.data?.name ?? " "}
        description={community.data?.description ?? " "}
        logoLink={community.data?.logo_link ?? " "}
        website={community.data?.website ?? " "}
        technologies={community.data?.technologies ?? []}
        country={community.data?.country ?? " "}
        location={community.data?.location ?? " "}
        focusArea={community.data?.focus_area ?? " "}
      />
      <div className="flex items-center py-20">
        <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 lg:gap-x-20">
          <div className="relative col-start-1 row-start-1 flex flex-col-reverse rounded-lg bg-gradient-to-t from-black/75 via-black/0 p-3 sm:row-start-2 sm:bg-none sm:p-0 lg:row-start-1">
            <h1 className="mt-1  text-lg font-semibold md:text-2xl">
              {community.data?.name} <VerificationTooltip verified={community.data?.verified} />
            </h1>
            <p className={`mb-2 text-sm font-medium leading-4 ${dark ? "text-slate-400" : "text-slate-600"}`}>{community.data?.focus_area}</p>
          </div>

          <div className="col-start-1 col-end-3 row-start-1 grid gap-4 sm:mb-6 sm:grid-cols-4 lg:col-start-2 lg:row-span-6 lg:row-end-6 lg:mb-0 lg:gap-6 lg:px-0 lg:py-0">
            <img src="/beach-house.jpg" alt="" className="h-60 w-full rounded-lg object-cover sm:col-span-2 sm:h-52 lg:col-span-full" loading="lazy" />
            <img
              src="/beach-house-interior-1.jpg"
              alt=""
              className="hidden h-52 w-full rounded-lg object-cover sm:col-span-2 sm:block md:col-span-1 lg:col-span-2 lg:row-start-2 lg:h-32"
              loading="lazy"
            />
            <img src="/beach-house-interior-2.jpg" alt="" className="hidden h-52 w-full rounded-lg object-cover md:block lg:col-span-2 lg:row-start-2 lg:h-32" loading="lazy" />
          </div>

          <div className="row-start-2 my-5 flex items-center text-sm font-medium sm:row-start-3 lg:row-start-2">
            <dd className={`flex items-center ${dark ? "text-[#00afef]" : "text-[#1A56DB]"}`}>
              <FaUserFriends className="mr-2 text-lg" />
              <span className={`font-normal ${dark ? "text-slate-400" : "text-slate-600"}`}>
                {community.data?._count.members} {community.data?._count.members === 1 ? "Member" : "Members"}
              </span>
            </dd>
            <dt className="sr-only">Location</dt>
            <dd className={`flex items-center ${dark ? "text-[#00afef]" : "text-[#1A56DB]"}`}>
              <FaMapMarkedAlt className="ml-2 mr-2 text-lg" />
              <span className={`font-normal ${dark ? "text-slate-400" : "text-slate-600"}`}>
                {community.data?.location}, {community.data?.country}
              </span>
            </dd>
          </div>
          <div className="col-start-1 row-start-3 self-center sm:col-start-2 sm:row-span-2 sm:row-start-2 sm:mt-0 lg:col-start-1 lg:row-start-3 lg:row-end-4">
            <Link href={community.data?.website ?? " "} target="_blank">
              <Button size="md" className="rounded-full">
                Visit Website
              </Button>
            </Link>
          </div>
          <div className="col-start-1 mt-4 text-base leading-6 sm:col-span-2 lg:col-span-1 lg:row-start-4 lg:mt-6">
            <p className={`${dark ? "text-gray-300" : "text-gray-700"}`}>{community.data?.description}</p>
            <SocialLinks links={linksData} />
            <Technologies technologies={community.data?.technologies ?? []} dark={dark} />
            <div className="mt-6">
              Added by:{" "}
              <Link href={"#"} className={`${dark ? "text-slate-400" : "text-slate-600"}`}>
                {community.data?.creator?.name}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunityPage;
