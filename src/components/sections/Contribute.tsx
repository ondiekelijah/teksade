import { Button, Text } from "@mantine/core";
import Link from "next/link";
import React from "react";

export default function Contribute() {
  return (
    <div className=" container mx-auto flex flex-col items-center justify-center gap-y-10 p-5">
      <h1 className=" text-4xl sm:text-5xl">Help us bring our vision to life</h1>
      <Text className=" mx-auto text-center">Make your mark on the open-source community. We are on the hunt for skilled developers and designers to contribute to our project. This is your chance to collaborate with a team of like-minded individuals and create something truly groundbreaking.</Text>
      <div className=" flex gap-5">
        <Link href="https://github.com/ondiekelijah/teksade">
          <Button>Contribute on Github</Button>
        </Link>
        <Button variant="outline">Follow on Twitter</Button>
      </div>
    </div>
  );
}
