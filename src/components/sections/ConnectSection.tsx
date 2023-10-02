/* eslint-disable @next/next/no-img-element */
import { Button } from "@mantine/core";
import Link from "next/link";
import React from "react";
import Container from "@/components/custom-components/container";
import { useMantineColorScheme } from "@mantine/core";
import Image from "next/image";

export default function ConnectSection() {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <Container>
      <section className="relative grid grid-cols-1 items-center gap-3 sm:grid-cols-2">
        {/* Content div */}
        <div className={`order-2 text-center lg:text-left flex flex-col justify-center gap-y-7 pt-5 lg:order-1`}>
          <p className={`${dark ? "text-slate-400" : "text-slate-600"}`}>Connect with techies near and far 🚀</p>
          <h2 className="text-4xl font-extrabold tracking-normal sm:text-5xl lg:text-6xl">Become part of something bigger</h2>
          <p className={`text-base sm:text-xl ${dark ? "text-slate-400" : "text-slate-600"} `}>
            There is strength in numbers. Teksade connects you with your tech tribe and even helps you discover more. We can all help to make the world a better place. Join in the fun!
          </p>
          <Link href="communities">
            <Button className="rounded-full text-base" size="lg" variant="gradient" gradient={{ from: "indigo", to: "cyan", deg: 45 }}>
              Explore Communities
            </Button>
          </Link>
        </div>
        {/* Image div */}
        <div className="order-1 flex items-center justify-center p-4 sm:order-2 lg:order-2">
          <div className=" h-full flex-[7]">
            <Image className="h-[40vh] w-full rounded-md object-cover sm:h-full" src="/img/g-2.svg" alt="contrib-1" width={500} height={700} />
          </div>
        </div>
      </section>
    </Container>
  );
}
