import { SignUpButton, useUser } from "@clerk/nextjs";
import { Button, Text } from "@mantine/core";
import Link from "next/link";
import React from "react";

export default function Hero() {
  const { user } = useUser();

  return (
    <section className=" z-0 flex h-[95vh] w-full flex-col items-center justify-center gap-y-7 bg-cover bg-center  bg-no-repeat px-3 sm:px-[20%]">
      <Text className=" p-3 text-center text-4xl font-bold sm:text-5xl">Discover the most vibrant and engaged tech communities.</Text>
      <Text className=" text-center text-lg">Welcome to Teksade. An easier and faster tech community discovery platform. Find your place among like-minded individuals</Text>
      <div className=" grid gap-3 sm:grid-cols-2">
        {user ? (
          <Link href="#popular">
            <Button size="lg">Get Started</Button>
          </Link>
        ) : (
          <SignUpButton mode="modal">
            <Button size="lg">Join Us</Button>
          </SignUpButton>
        )}
        <Link href="/about">
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </Link>
      </div>
    </section>
  );
}
