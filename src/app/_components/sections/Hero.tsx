import { useUser } from "@clerk/nextjs";
import { Text, Title } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { useMantineColorScheme } from "@mantine/core";
import Container from "../custom-components/container";
import CustomButton from "../custom-components/button";

export default function Hero() {
  const { user } = useUser();

  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <Container>
      <section className="z-0 flex min-h-max w-full flex-col items-center justify-center gap-y-7 overflow-hidden bg-cover bg-center bg-no-repeat py-20">
        <Text
          className="max-w-full overflow-hidden text-center text-4xl font-black tracking-normal sm:text-5xl lg:text-7xl/[90px]"
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan", deg: 95 }}
        >
          Discover the most vibrant and engaged tech communities.
        </Text>

        <Title
          order={2}
          className={`mx-auto max-w-full overflow-hidden text-center text-base font-normal sm:text-2xl lg:max-w-screen-md ${
            dark ? "text-slate-400" : "text-slate-600"
          }`}
        >
          Welcome to Teksade. An easier and faster tech community discovery
          platform. Find your place among like-minded individuals.
        </Title>
        <div className="grid gap-10 text-center sm:grid-cols-2">
          {user ? (
            <Link href="#popular">
              <CustomButton
                size="lg"
                variant="gradient"
                title="Get Started"
                isWithArrow
              />
            </Link>
          ) : (
            <Link href="/sign-up">
              <CustomButton
                size="lg"
                variant="gradient"
                title="Join Us"
                isWithArrow
              />
            </Link>
          )}
          <Link href="/about">
            <CustomButton size="lg" variant="outline" title="Learn More" />
          </Link>
        </div>
      </section>
    </Container>
  );
}
