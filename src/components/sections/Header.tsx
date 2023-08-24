import React from "react";
import { Burger, Button, Drawer, Paper } from "@mantine/core";
import { CgProfile } from "react-icons/cg";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";


export default function Header() {
  const [opened, { open, close }] = useDisclosure(false);
  const userStatus = useUser();

  const RenderButton = ({ href, children }) => (
    <Link href={href}>
      <Button variant="subtle" className="rounded-full w-full px-4 py-2 text-base">
        {children}
      </Button>
    </Link>
  );

  return (
    <Paper className="container relative max-w-screen-lg flex flex-wrap items-center justify-between px-8 py-3 mx-auto lg:justify-between xl:px-0">
      <Burger opened={false} className="text-2xl sm:hidden" onClick={open} />
      <Link href="/" className="text-3xl font-bold">
        Teksade
      </Link>
      <section className="mr-4 hidden grow items-center justify-end sm:flex">
        <RenderButton href="/communities">Communities</RenderButton>
        <RenderButton href="/about">About Us</RenderButton>

        {userStatus.user ? (
          <RenderButton href="/communities/new">Add Community</RenderButton>
        ) : (
          <SignInButton mode="modal">
            <Button variant="subtle" className="rounded-full w-full px-4 py-2 text-gray-700 dark:text-gray-300">
              Sign Up
            </Button>
          </SignInButton>
        )}
        {userStatus.user && (
          <Link href="profile" className="flex items-center gap-x-2 ml-3">
            <UserButton />
          </Link>
        )}
      </section>
      <ThemeToggle />

      <Drawer
        opened={opened}
        onClose={close}
        size="xs"
        title={
          <Link href="/" className="w-full text-center text-3xl font-bold">
            Teksade
          </Link>
        }
        overlayProps={{ opacity: 0.5, blur: 4 }}
        transitionProps={{
          transition: "slide-right",
          duration: 300,
          timingFunction: "linear",
        }}
      >
        <section className="flex flex-col gap-y-4">
          <RenderButton href="/communities">Communities</RenderButton>
          <RenderButton href="/about">About Us</RenderButton>
          <div className="flex items-center justify-between gap-2">
            {userStatus.user && (
              <>
                <RenderButton href="/communities/new">Add Community</RenderButton>
                <UserButton />
              </>
            )}
            <ThemeToggle />
          </div>
        </section>
      </Drawer>
    </Paper>
  );
}

