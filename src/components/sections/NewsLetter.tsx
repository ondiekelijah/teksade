/* eslint-disable @next/next/no-img-element */
import { Button, TextInput } from "@mantine/core";
import React from "react";

export default function NewsLetter() {
  return (
    <div className=" container mx-auto my-10 grid w-full grid-cols-1 gap-3 rounded p-5 shadow-2xl sm:grid-cols-2">
      <div className=" flex  w-full grow flex-col  justify-center gap-y-4">
        <h1 className=" text-4xl sm:text-6xl">Innovative Minds & News</h1>
        <p>We are glad you are here! So why not subscribe today and stay up-to-date on all the latest news and information about what is going on in the tech community?</p>
        <div className=" relative flex w-full items-center">
          <TextInput radius="xl" size="lg" className=" w-full" placeholder="Your email address" />
          <Button className=" absolute right-[3%] z-20 rounded-full">Subscribe</Button>
        </div>
      </div>
      <img src="/img/newletter.svg" className=" order-first h-80 w-80  justify-self-end sm:order-last" alt="news letter" />
    </div>
  );
}
