"use client"
import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";
import { Button, IconButton } from "../Button";
import { ThemeSelect, ThemeToggle } from "../ThemeToggle";
import Logo from "../Logo";
import { AuthenticationDialog } from "../AuthenticationDialog";
import { User, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
export const Header: React.FC = () => {
  const [showAuth, setShowAuth] = useState(true);
  const [activUser, setActiveUser] = useState<User | null>(null)


  const supabase = createClientComponentClient()

  async function activeUserPresent() {
    const { data } = await supabase.auth.getUser()
    if (data.user) {
      setActiveUser(data.user)
    } else {
      setActiveUser(null)
    }
  }
  activeUserPresent()


  return (
    <>
      <header className="sticky inset-x-0 top-0 z-30 px-2 py-2 bg-white shadow-lg dark:bg-slate-900/75 sm:py-3 sm:px-5">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          <MenuPopOver
            className="grow-0 basis-1/3"
            display="md:hidden"
            setShowAuth={setShowAuth}
          />
          <div className="flex justify-center shrink-0 grow-0 basis-1/3 md:justify-start">
            <Link href="/#" className="my-auto flex w-[120px] md:ml-0">
              <Logo />
            </Link>
            <div className="hidden gap-2 md:ml-2 md:flex">
              <Link href="/communities" passHref legacyBehavior>
                <Button variant="ghost" as="a">
                  Communities
                </Button>
              </Link>
              <Link href="/#" passHref legacyBehavior>
                <Button variant="ghost" as="a">
                  About Us
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative flex items-center justify-end gap-2 basis-1/3">
            {activUser?.email &&
              <Link href="/#" passHref legacyBehavior>

                <Button as="a" variant="ghost" className="hidden md:inline-flex">
                  Add Community
                </Button>
              </Link>
            }


            {activUser?.email ? (
              <h3>
                {activUser.email}
              </h3>
            ) : (
              <Button
                variant="ghost"
                className="hidden md:inline-flex"
                onClick={() => setShowAuth(true)}
              >
                Sign In
              </Button>
            )}

            <ThemeToggle />
          </div>
        </div>
      </header>
      <AuthenticationDialog
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
      />
    </>
  );
};

const MenuPopOver = ({ className, display, setShowAuth }: any) => {
  let [isOpen, setIsOpen] = useState(false);
  const [loginUser, setLoginUser] = useState("");

  return (
    <div className={clsx(className, display)}>
      <IconButton
        variant="ghost"
        aria-label="Navigation Menu"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </IconButton>
      <Transition
        show={isOpen}
        appear
        as={Fragment}
        enter="transform transition ease-in-out duration-300"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transform transition ease-in-out duration-300 delay-200"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <Dialog
          as="div"
          className={clsx("fixed inset-0 z-50 ", display)}
          onClose={setIsOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300 delay-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 dark:bg-gray-900/80 bg-black/20 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed top-0 bottom-0 left-0 w-full max-w-xs p-6 bg-white shadow-lg rounded-r-xl dark:bg-gray-800 ">
            <a className="mx-auto mt-4 flex w-[140px]">
              <Logo />
            </a>
            <ul className="mt-8 space-y-3">
              <li className="relative flex items-center overflow-hidden rounded-md hover:bg-slate-200/50 group h-9">
                <span className="absolute w-2 h-full transition-all bg-indigo-700 opacity-0 group-hover:opacity-100" />
                <Link
                  href="/communities"
                  passHref
                  className="w-full font-medium transition-all group-hover:pl-3"
                >
                  Communities
                </Link>
              </li>
              <li className="relative flex items-center overflow-hidden rounded-md hover:bg-slate-200/50 group h-9">
                <span className="absolute w-2 h-full transition-all bg-indigo-700 opacity-0 group-hover:opacity-100" />
                <Link
                  href="/#"
                  passHref
                  className="w-full font-medium transition-all group-hover:pl-3"
                >
                  About Us
                </Link>
              </li>
            </ul>

            <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-200/10">
              <ThemeSelect />
            </div>
            <ul className="mt-8 space-y-3 border-t border-gray-200 dark:border-gray-200/10">
              <li>
                {loginUser ? (
                  <h3>{loginUser}</h3>
                ) : (
                  <Button
                    variant="ghost"
                    className="hidden md:inline-flex"
                    onClick={() => setShowAuth(true)}
                  >
                    Sign In
                  </Button>
                )}
              </li>
              <li>
                <Link href="/#" passHref legacyBehavior>
                  <Button as="a" variant="outline" fullWidth>
                    Add Community
                  </Button>
                </Link>
              </li>
            </ul>

            <IconButton
              variant="ghost"
              aria-label="Close Navigation Menu"
              className="absolute top-5 right-5"
              onClick={() => setIsOpen(false)}
            >
              <svg
                viewBox="0 0 10 10"
                className="h-2.5 w-2.5 overflow-visible"
                aria-hidden="true"
              >
                <path
                  d="M0 0L10 10M10 0L0 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </IconButton>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
