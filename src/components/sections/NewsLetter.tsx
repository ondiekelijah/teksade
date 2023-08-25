/* eslint-disable @next/next/no-img-element */
import { Button, TextInput } from "@mantine/core";
import React from "react";
import Container from "@/components/custom-components/container";

export default function NewsLetter() {
  return (
    <Container>
      <div className="mx-auto my-20 grid w-full grid-cols-1 gap-3 rounded-lg px-8 py-10 shadow-2xl sm:grid-cols-2">
        <div className=" flex  w-full grow flex-col  justify-center gap-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">Innovative Minds & News</h1>
          <p className="text-base sm:text-xl">We are glad you are here! So why not subscribe today and stay up-to-date on all the latest news and information about what is going on in the tech community?</p>
          <div className=" relative flex w-full items-center">
            <TextInput radius="xl" size="lg" className=" w-full" placeholder="Your email address" />
            <Button className=" absolute right-[3%] z-20 rounded-full">Subscribe</Button>
          </div>
        </div>
        <img src="/img/newsletter.svg" className=" order-first h-80 w-80  justify-self-end sm:order-last" alt="news letter" />
      </div>
    </Container>
  );
}
