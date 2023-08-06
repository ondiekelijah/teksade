/* eslint-disable @next/next/no-img-element */
import { Button } from "@mantine/core";
import Link from "next/link";
import React from "react";

export default function ConnectSection() {
  return (
    <section className=" grid grid-cols-1  gap-3 p-10 sm:grid-cols-2">
      <div className=" flex flex-col justify-center gap-y-7 pt-5">
        <p>Connect with techies near and far 🚀</p>
        <h2 className=" text-xl font-bold sm:text-6xl">Become part of something bigger</h2>
        <p className="text-lg">
          There is strength in numbers <br />
          Teksade connects you with your tech tribe and even helps you discover more. We can all help to make the world a better place. Join in the fun!
        </p>
        <Link href="communities">
          <Button>Explore Communities</Button>
        </Link>
      </div>
      <div className="order-1 flex items-center gap-3 sm:order-2">
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
  );
}
