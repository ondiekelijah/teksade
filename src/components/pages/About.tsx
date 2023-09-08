import React from "react";
import { Text, useMantineTheme } from "@mantine/core";
import Link from "next/link";
import CustomButton from "../custom-components/button";

const pageData = {
  title: "Between Bytes and Bits, Teksade Seeks the Heartbeats.",
  description: [
    "Teksade, at its core, is more than just a community discovery platform; it's a revolution in how the tech world connects. Born from a vision to make the vast tech landscape feel like a close-knit neighborhood, we prioritize collaboration over competition. We're not just here to grow; we're here to grow together, ensuring every tech enthusiast finds their tribe and their voice.",
    "By partnering with tech trailblazers globally, we craft experiences that are transformative, inclusive, and devoid of the barriers traditional platforms present. With Teksade, it's not just about technology; it's about the people behind every line of code, every innovation, and every breakthrough.",
  ],
  mission: "Unifying the global tech realm by bridging divides, nurturing relationships, and championing the spirit of innovation.",

  vision: "Envisioning a world where technology transcends boundaries, fostering a close-knit global community that thrives on collaboration and shared passion.",
  culture:
    "At Teksade, we're not just about connecting individuals; we're about building a culture. Our ethos is grounded in creating a space that radiates positivity, inclusivity, and promotes an ever-evolving environment for knowledge exchange. We are firm believers in the power of community-driven learning, and through Teksade, we aim to provide every tech enthusiast with an ambiance that not only supports but celebrates every step of their learning journey.",
};

const About = () => {
  const theme = useMantineTheme();
  const dark = theme.colorScheme === "dark";
  return (
    <>
      <div className="px-4 text-center sm:px-0">
        <div className="mx-auto max-w-screen-lg py-8">
          <Text className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl" variant="gradient" gradient={{ from: "indigo", to: "cyan", deg: 195 }}>
            {pageData.title}
          </Text>
          <div className="mx-auto max-w-xl">
            {pageData.description.map((desc, idx) => (
              <p key={idx} className={`mt-6 text-lg ${dark ? "text-slate-400" : "text-slate-600"}`}>
                {desc}
              </p>
            ))}
          </div>
        </div>
        <div className="bg-[#5c7cfa] rounded-lg sm:rounded-none">
          <div className="mx-auto flex max-w-xl flex-col-reverse items-center py-20 sm:flex-row">
            <p className={`mt-4 flex-1 text-center text-lg sm:text-left`}>{pageData.mission}</p>
            <h2 className="flex-1 text-center text-xl font-bold sm:text-right sm:text-6xl">Mission</h2>
          </div>
        </div>

        <div className="mx-auto flex max-w-xl flex-col-reverse items-center py-20 sm:flex-row-reverse">
          <p className={`mt-4 flex-1 text-center text-lg sm:text-right ${dark ? "text-slate-400" : "text-slate-600"}`}>{pageData.vision}</p>
          <h2 className={`flex-1 text-center text-xl font-bold sm:text-left sm:text-6xl ${dark ? "text-[#5c7cfa]" : "text-[#00afef]"}`}>Vision</h2>
        </div>

        <div>
          <div className="mx-auto flex max-w-xl flex-col-reverse items-center py-20 sm:flex-row">
            <p className={`mt-4 flex-1 text-center text-lg sm:text-left ${dark ? "text-slate-400" : "text-slate-600"}`}>{pageData.culture}</p>
            <h2 className={`flex-1 text-center text-xl font-bold sm:text-right sm:text-6xl ${dark ? "text-[#5c7cfa]" : "text-[#00afef]"}`}>Culture</h2>
          </div>
        </div>

        <div className="mx-auto max-w-screen-lg">
          <Text className="mb-6 text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl/[70px]" variant="gradient" gradient={{ from: "indigo", to: "cyan", deg: 195 }}>
            Beyond the Screen, Find Your Scene.
          </Text>
          <div className="mt-4 text-center">
            <Link href="/sign-up">
              <CustomButton size="lg" variant="gradient" title="Find My Scene" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
