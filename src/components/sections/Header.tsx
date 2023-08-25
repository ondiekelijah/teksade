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

  interface RenderButtonProps {
    href: string;
    children: React.ReactNode;
  }
  const RenderButton: React.FC<RenderButtonProps & { className?: string }> = ({ href, children, className }) => (
    <Link href={href} className={`mr-3 w-full whitespace-nowrap py-2 text-base sm:px-0 ${className ?? className}`}>
      {children}
    </Link>
  );

  return (
    <Paper className={`container relative mx-auto flex max-w-screen-xl flex-wrap items-center justify-between px-4 py-3 sm:px-8 lg:justify-between lg:px-12`}>
      <Burger opened={false} className="text-2xl sm:hidden" onClick={open} />

      <Link href="/" className="text-3xl font-bold">
        Teksade
      </Link>

      <div className="flex items-center">
        {" "}
        {/* <- This is the added container */}
        <section className="mr-4 hidden items-center space-x-10 sm:flex">
          <RenderButton href="/communities" className="mr-4">
            Communities
          </RenderButton>
          <RenderButton href="/about">About Us</RenderButton>

          {userStatus.user ? (
            <RenderButton href="/communities/new">Add Community</RenderButton>
          ) : (
            <SignInButton mode="modal">
              <RenderButton href="#" className="mr-4">
                Sign Up
              </RenderButton>
            </SignInButton>
          )}
          {userStatus.user && (
            <Link href="profile" className="flex items-center gap-x-2">
              <UserButton />
            </Link>
          )}
        </section>
        <ThemeToggle />
      </div>

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
        <section className="flex flex-col gap-y-4 pl-0">
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
