import { SignUpButton, useUser } from "@clerk/nextjs";
import { Button, Text, Box } from "@mantine/core";
import Link from "next/link";
import React from "react";
import Container from "@/components/custom-components/container";
import Shadow from "@/components/custom-components/shadow";

export default function Hero() {
  const { user } = useUser();

  return (
    <Container>
      <section className="relative z-0 flex h-[95vh] w-full flex-col items-center justify-center gap-y-7 bg-cover bg-center bg-no-repeat">
        <Shadow />
        <Text className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl" variant="gradient" gradient={{ from: "indigo", to: "cyan", deg: 45 }}>
          Discover the most vibrant and engaged tech communities.
        </Text>

        <Text className=" pt-6 text-center text-base sm:text-2xl">Welcome to Teksade. An easier and faster tech community discovery platform. Find your place among like-minded individuals.</Text>
        <div className=" grid gap-3 sm:grid-cols-2">
          {user ? (
            <Link href="#popular">
              <Button size="lg" className="rounded-full">
                Get Started
              </Button>
            </Link>
          ) : (
            <SignUpButton mode="modal">
              <Button size="lg" className="rounded-full">
                Join Us
              </Button>
            </SignUpButton>
          )}
          <Link href="/about">
            <Button size="lg" variant="outline" className="rounded-full">
              Learn More
            </Button>
          </Link>
        </div>
      </section>
    </Container>
  );
}
