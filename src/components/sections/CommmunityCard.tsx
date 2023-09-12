/* eslint-disable @next/next/no-img-element */
import { storageBucket } from "@/utils/firestoreConfig";
import { LoadingOverlay, Paper, Text, Tooltip } from "@mantine/core";
import { ref } from "firebase/storage";
import Link from "next/link";
import React from "react";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { BsPerson } from "react-icons/bs";
import LocationIcon from "../custom-components/icons/locationIcon";
import siteMetadata from "@/data/siteMetadata";
import Checkmark from "../custom-components/icons/checkmark";

interface CommmunityCardProps {
  id: string;
  description: string;
  country: string;
  location: string;
  name: string;
  members: number;
  logoUrl: string;
  verified: boolean;
  actionButtons?: React.ReactNode;
}
export default function CommmunityCard(community: CommmunityCardProps) {
  const [logoImage, loading] = useDownloadURL(ref(storageBucket, `logos/${community.logoUrl}`));
  return (
    <Link href={`/communities/${community.id}`}>
      <Paper key={community.id} className="group relative mb-8 rounded-lg shadow-lg">
        <div className="relative ">
          <LoadingOverlay visible={loading} />
          <p className="absolute top-5 hidden w-full text-center group-hover:inline">{community.description}</p>
          <img src={logoImage ?? "/img/twitter-card.svg"} alt="Cover Photo" className="h-56 w-full rounded-t-lg object-cover group-hover:opacity-20" />
        </div>

        <div className="p-4">
          <Text color="dimmed" className="-ml-0.5 flex items-center text-xs font-bold">
            <LocationIcon />
            {community.country} , {community.location}
          </Text>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <h3 className="flex-grow">{community.name}</h3>
              {community.verified && (
                <Tooltip withArrow label={siteMetadata.verificationTooltip} arrowSize={5}>
                  <Text className="align-middle">
                    <Checkmark  />
                  </Text>
                </Tooltip>
              )}
            </div>

            <span className="my-4 flex items-center text-lg">
              <BsPerson className="" /> <span className="text-xs ">{community.members}</span>
            </span>
          </div>
          {/* Render action buttons, a react node */}
          {community.actionButtons}
        </div>
      </Paper>
    </Link>
  );
}
