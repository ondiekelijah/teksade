import { Button, Text } from "@mantine/core";
import Link from "next/link";
import React from "react";
import Container from "@/components/custom-components/container";
import { useMantineColorScheme } from "@mantine/core";

export default function Contribute() {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <Container>
      <div className="flex flex-col items-center justify-center gap-y-10 p-5">
        <h1 className="text-center text-4xl font-extrabold tracking-normal sm:text-5xl lg:text-6xl">Got passion? Fuel our vision!</h1>
        <Text className={`mx-auto text-center text-base sm:text-xl ${dark ? "text-slate-400" : "text-slate-600"}`}>
          Make your mark on the open-source community. We are on the hunt for skilled developers and designers to contribute to our project. This is your chance to collaborate with a team of
          like-minded individuals and create something truly groundbreaking.
        </Text>
        <div className="flex flex-col gap-5 sm:flex-row">
          <Link href="https://github.com/ondiekelijah/teksade" target="_blank">
            <Button variant="default" className={`w-full tracking-wide rounded-full sm:w-auto ${dark ? " text-white" : "bg-white text-black"}`} size="md" leftIcon={<GitHub dark={dark} />}>
              Contribute on Github
            </Button>
          </Link>
          <Link href="https://twitter.com/teksadehq" target="_blank">
            <Button
              variant="default"
              className={`w-full rounded-full tracking-wide sm:w-auto ${dark ? " text-white" : "bg-white text-black"}`}
              size="md"
              leftIcon={<Twitter />}
              color={dark ? "white" : "black"}
            >
              Follow on Twitter
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}

interface TwitterProps {
  size?: number;
}

interface GitHubProps {
  size?: number;
  dark: boolean;
}

const Twitter = ({ size = 24 }: TwitterProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={`#1da1f2 `}>
    <path d="M24 4.37a9.6 9.6 0 0 1-2.83.8 5.04 5.04 0 0 0 2.17-2.8c-.95.58-2 1-3.13 1.22A4.86 4.86 0 0 0 16.61 2a4.99 4.99 0 0 0-4.79 6.2A13.87 13.87 0 0 1 1.67 2.92 5.12 5.12 0 0 0 3.2 9.67a4.82 4.82 0 0 1-2.23-.64v.07c0 2.44 1.7 4.48 3.95 4.95a4.84 4.84 0 0 1-2.22.08c.63 2.01 2.45 3.47 4.6 3.51A9.72 9.72 0 0 1 0 19.74 13.68 13.68 0 0 0 7.55 22c9.06 0 14-7.7 14-14.37v-.65c.96-.71 1.79-1.6 2.45-2.61z" />
  </svg>
);

const GitHub = ({ size = 24, dark }: GitHubProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={`${dark ? "white" : "black"}`}>
    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.41 2.87 8.14 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-1.04-.01-1.89-2.67.61-3.22-1.15-3.22-1.15-.46-1.16-1.12-1.47-1.12-1.47-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.9 1.54 2.35 1.1 2.92.84.09-.65.35-1.1.64-1.35-2.13-.24-4.38-1.07-4.38-4.78 0-1.06.37-1.92 1-2.6-.1-.24-.43-1.21.09-2.53 0 0 .82-.26 2.7 1a9.27 9.27 0 0 1 4.91 0c1.87-1.28 2.68-1 2.68-1 .53 1.31.2 2.29.1 2.53.63.68 1 1.54 1 2.6 0 3.71-2.25 4.53-4.39 4.77.36.31.68.93.68 1.87 0 1.35-.01 2.43-.01 2.77 0 .26.18.58.69.48A10.02 10.02 0 0 0 22 12C22 6.48 17.52 2 12 2z" />
  </svg>
);
