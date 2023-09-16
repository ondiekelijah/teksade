import React from "react";
import { Burger, Button, Drawer, Menu, Paper, useMantineColorScheme } from "@mantine/core";
import { CgProfile } from "react-icons/cg";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import siteMetadata from "@/data/siteMetadata";
import useAdminCheck from "@/hooks/useAuth";

export default function Header() {
  const [opened, { open, close }] = useDisclosure(false);
  const userStatus = useUser();
  const userIsAdmin = useAdminCheck();
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  interface RenderButtonProps {
    href: string;
    children: React.ReactNode;
  }
  const RenderButton: React.FC<RenderButtonProps & { className?: string }> = ({ href, children, className }) => (
    <Link href={href} className={`mr-3 w-full whitespace-nowrap py-2 text-base sm:px-0 ${dark ? "hover:text-[#00afef]" : "hover:text-[#1A56DB]"} ${className ?? className}`} onClick={close}>
      {children}
    </Link>
  );

  return (
    <Paper className={`sticky-header container relative mx-auto flex max-w-screen-xl flex-wrap items-center justify-between bg-transparent px-4 py-3 sm:px-8 lg:justify-between lg:px-12`}>
      <Burger opened={false} className="text-2xl sm:hidden" onClick={open} />

      <Link href="/" className="items-center space-x-2 text-2xl font-bold">
        <Image src={`${siteMetadata.siteLogo}`} width={45} height={45} alt="Teksade Logo" className="mb-1" />
        <span className="hidden sm:inline">{siteMetadata.headerTitle}</span>
      </Link>

      <div className="flex items-center">
        {" "}
        {/* <- This is the added container */}
        <section className="mr-4 hidden items-center space-x-10 sm:flex">
          <RenderButton href="/communities">
            Communities
          </RenderButton>
          <RenderButton href="/about">About Us</RenderButton>
          {userStatus.user ? (
            <>
              <Menu trigger="hover" openDelay={100} closeDelay={4000} position="bottom" offset={10} withArrow arrowPosition="side">
                <Menu.Target>
                  <button className="cursor-pointer border-none bg-transparent outline-none hover:bg-transparent focus:outline-none active:outline-none">Account</button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item>
                    <RenderButton href="/profile">Profile</RenderButton>
                  </Menu.Item>
                  <Menu.Item>
                    <RenderButton href="/communities/new">Add Community</RenderButton>
                  </Menu.Item>
                  <Menu.Item>
                    <RenderButton href="/communities/created">Created Communities</RenderButton>
                  </Menu.Item>
                  <Menu.Item>
                    <RenderButton href="/communities/joined">Joined Communities</RenderButton>
                  </Menu.Item>
                  {userIsAdmin && (
                    <Menu.Item>
                      <RenderButton href="/admin/publish">Admin</RenderButton>
                    </Menu.Item>
                  )}
                </Menu.Dropdown>
              </Menu>
            </>
          ) : (
            <SignInButton mode="modal">
              <RenderButton href="/sign-up" className="mr-4">
                Get Started
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
            <Image src={`${siteMetadata.siteLogo}`} width={50} height={50} alt="Teksade Logo" />
          </Link>
        }
        overlayProps={{ opacity: 0.5, blur: 4 }}
        transitionProps={{
          transition: "slide-right",
          duration: 300,
          timingFunction: "linear",
        }}
      >
        <section className="flex flex-col pl-0 space-y-6">
          <RenderButton href="/communities">Communities</RenderButton>
          <RenderButton href="/about">About Us</RenderButton>
          {userStatus.user && (
            <div className="py-2">
              <Menu trigger="hover" openDelay={100} closeDelay={4000} position="right" offset={22} withArrow arrowPosition="center">
                <Menu.Target>
                  <button className="cursor-pointer border-none bg-transparent outline-none hover:bg-transparent focus:outline-none active:outline-none">Account</button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item>
                    <RenderButton href="/profile">Profile</RenderButton>
                  </Menu.Item>
                  <Menu.Item>
                    <RenderButton href="/communities/new">Add Community</RenderButton>
                  </Menu.Item>
                  <Menu.Item>
                    <RenderButton href="/communities/created">Created Communities</RenderButton>
                  </Menu.Item>
                  <Menu.Item>
                    <RenderButton href="/communities/joined">Joined Communities</RenderButton>
                  </Menu.Item>
                  {userIsAdmin && (
                    <Menu.Item>
                      <RenderButton href="/admin/publish">Admin</RenderButton>
                    </Menu.Item>
                  )}
                </Menu.Dropdown>
              </Menu>
            </div>
          )}
          <div className="flex items-center justify-between gap-2">
            {userStatus.user && (
              <>
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
