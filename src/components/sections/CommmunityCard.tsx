/* eslint-disable @next/next/no-img-element */
import { storageBucket } from "@/utils/firestoreConfig";
import { LoadingOverlay, Paper, Text } from "@mantine/core";
import { ref } from "firebase/storage";
import Link from "next/link";
import React from "react";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { BsPerson } from "react-icons/bs";

interface CommmunityCardProps {
  id: string;
  description: string;
  country: string;
  location: string;
  name: string;
  members: number;
  logoUrl: string;
}
export default function CommmunityCard(communinty: CommmunityCardProps) {
  const [logoImage, loading] = useDownloadURL(ref(storageBucket, communinty.logoUrl));
  return (
    <Link href={`/communities/${communinty.id}`}>
      <Paper withBorder key={communinty.id} className="group relative border-2 p-2 shadow-lg">
        <div className="relative ">
          <LoadingOverlay visible={loading} />
          <p className="absolute top-0 hidden w-full text-center group-hover:inline ">{communinty.description}</p>
          <img src={logoImage ?? "/img/hero.jpg"} alt="logo" className="h-56 w-full rounded object-cover group-hover:opacity-20" />
        </div>

        <div className="my-2 ">
          <Text color="dimmed" className="text-xs font-bold">
            {communinty.country} , {communinty.location}
          </Text>
          <div className="flex items-center justify-between ">
            <p className="grow font-bold"> {communinty.name}</p>
            <span className="flex items-center text-lg ">
              <BsPerson className="" /> <span className="text-xs ">{communinty.members}</span>
            </span>
          </div>
        </div>
      </Paper>
    </Link>
  );
}
