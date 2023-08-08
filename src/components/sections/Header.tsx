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

  return (
    <Paper className=" sticky top-0 z-50  flex w-full items-center justify-between p-2 px-4 shadow-xl">
      <Burger opened={false} className=" text-2xl sm:hidden " onClick={open} />
      <Link href="/" className=" text-3xl font-bold">
        Teksade
      </Link>
      <section className=" mr-4 hidden grow items-center justify-end  sm:flex ">
        <Link href="/communities">
          <Button variant="subtle" className=" rounded-full">
            Communities
          </Button>
        </Link>
        <Link href="/about">
          <Button variant="subtle" className=" rounded-full">
            About Us
          </Button>
        </Link>

        {userStatus.user ? (
          <Link href="/communities/new">
            <Button variant="subtle" className=" rounded-full">
              Add Community
            </Button>
          </Link>
        ) : (
          <SignInButton mode="modal">
            <Button variant="subtle" className=" rounded-full">
              Sign Up
            </Button>
          </SignInButton>
        )}
        {userStatus.user && (
          <Link href="/profile" className=" flex items-center gap-x-2">
            <CgProfile className=" text-4xl" />
            <UserButton />
          </Link>
        )}
      </section>
      <ThemeToggle />

      {/* Drawer only displayed on small devices */}

      <Drawer
        opened={opened}
        onClose={close}
        size="xs"
        title={
          <Link href="/" className=" w-full text-center text-3xl font-bold">
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
        <section className=" flex flex-col gap-y-4">
          <Link href="/communities">
            <Button variant="subtle" className=" rounded-full">
              Communities
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="subtle" className=" rounded-full">
              About Us
            </Button>
          </Link>

          <div className=" flex items-center justify-between gap-2">
            {userStatus.user && (
              <>
                <Link href="/communities/new">
                  <Button variant="subtle" className=" rounded-full">
                    Add Community
                  </Button>
                </Link>
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
