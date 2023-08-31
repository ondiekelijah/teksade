import { SignUpButton, useUser } from "@clerk/nextjs";
import { Button, Text } from "@mantine/core";
import Link from "next/link";
import React, { useState } from "react";
import Container from "@/components/custom-components/container";
import Shadow from "@/components/custom-components/shadow";
import { RoughNotation } from "react-rough-notation";
import { useMantineColorScheme } from "@mantine/core";
import CustomButton from "@/components/custom-components/button";
import StickyBanner from "../custom-components/newsBanner";

export default function Hero() {
  const { user } = useUser();
  const [showBanner, setShowBanner] = useState(true);
  const [hideNotation, setHideNotation] = useState(false);
  const [notationKey, setNotationKey] = useState(0);

  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const handleBannerClose = () => {
    setShowBanner(false);

    // Hide the notation immediately
    setHideNotation(true);

    // After a short delay, force re-render of RoughNotation
    setTimeout(() => {
      setHideNotation(false);
      setNotationKey((prevKey) => prevKey + 1);
    }, 200); // 200ms delay, can be adjusted
  };

  return (
    <Container>
      <section className="relative z-0 flex h-[90vh] w-full flex-col items-center justify-center gap-y-7 bg-cover bg-center bg-no-repeat">
        <Shadow dark={dark} />
        {showBanner && <StickyBanner message="New brand identity has been launched for the" link="https://flowbite.com" linkText="Flowbite Library" onClose={handleBannerClose} />}
        <Text className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl/[90px]" variant="gradient" gradient={{ from: "indigo", to: "cyan", deg: 45 }}>
          Discover the most
          {!hideNotation && (
            <RoughNotation type="underline" show={true} key={`vibrant-${notationKey}`} color="#00afef" animationDelay={800} animationDuration={1200}>
              {" "}
              vibrant{" "}
            </RoughNotation>
          )}
          and
          {!hideNotation && (
            <RoughNotation type="underline" show={true} key={`engaged-${notationKey}`} color="#00afef" animationDelay={800} animationDuration={1200}>
              {" "}
              engaged{" "}
            </RoughNotation>
          )}
          tech communities.
        </Text>

        <Text className={`mx-auto max-w-full text-center text-base sm:text-2xl lg:max-w-screen-md ${dark ? "text-slate-400" : "text-slate-600"}`}>
          Welcome to Teksade. An easier and faster tech community discovery platform. Find your place among like-minded individuals.
        </Text>
        <div className=" grid gap-3 sm:grid-cols-2">
          {user ? (
            <Link href="#popular">
              <CustomButton size="lg" variant="gradient" title="Get Started" />
            </Link>
          ) : (
            <SignUpButton mode="modal">
              <CustomButton size="lg" variant="gradient" title="Join Us" />
            </SignUpButton>
          )}
          <Link href="/about">
            <CustomButton size="lg" variant="outline" title="Learn More" />
          </Link>
        </div>
      </section>
    </Container>
  );
}
