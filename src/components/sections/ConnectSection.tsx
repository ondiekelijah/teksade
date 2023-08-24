/* eslint-disable @next/next/no-img-element */
import { Button } from "@mantine/core";
import Link from "next/link";
import React from "react";
import Container from "@/components/custom-components/container";
import Shadow from "@/components/custom-components/shadow";

export default function ConnectSection() {
  return (
    <Container>
      <section className="relative grid grid-cols-1  gap-3 sm:grid-cols-2">
        <Shadow />
        <div className=" flex flex-col justify-center gap-y-7 pt-5">
          <p>Connect with techies near and far 🚀</p>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">Become part of something bigger</h2>
          <p className="text-base sm:text-2xl">
            There is strength in numbers.
            Teksade connects you with your tech tribe and even helps you discover more. We can all help to make the world a better place. Join in the fun!
          </p>
          <Link href="communities">
            <Button className="text-xl rounded-full" size="lg">Explore Communities</Button>
          </Link>
        </div>
        <div className="order-1 flex items-center gap-3 sm:order-2 p-4">
          <div className=" flex-[7]">
            <img className="h-[40vh] w-full rounded-md object-cover sm:h-[90vh]" src="img/g-2.jpg" alt="long image" />
          </div>
          <div className=" flex h-full flex-[3] flex-col ">
            <img className="mb-1 w-full flex-[25] rounded-md object-cover" src="img/g-3.jpg" alt="short image 1" />
            <img className="mb-1 w-full flex-[50] rounded-md object-cover" src="img/kate.jpeg" alt="short image 2" />
            <img className="w-full flex-[25] rounded-md object-cover" src="img/g-1.jpg" alt="short image 1" />
          </div>
        </div>
      </section>
    </Container>
  );
}
