import React, { Fragment } from "react";
import { Dialog, Tab, Transition } from "@headlessui/react";
import clsx from "clsx";
import Logo from "./Logo";
import { IconButton } from "./Button";
import { SignInForm } from "./auth/LoginForm";
import { SignUpFrom } from "./auth/RegisterForm";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const AuthenticationDialog: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto "
          onClose={onClose}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black/20 backdrop-blur-sm dark:bg-gray-900/80" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden align-middle transition-all transform bg-white shadow-xl rounded-2xl dark:bg-gray-800">
                <span className="mx-auto flex w-[140px] ">
                  <Logo />
                </span>
                <Tab.Group>
                  <Tab.List className="flex mt-4 overflow-hidden bg-indigo-100 rounded-lg dark:text-gray-500">
                    <Tab
                      className={({ selected }) =>
                        clsx(
                          "w-full py-2.5 font-medium leading-5",
                          selected ? "bg-indigo-700 text-white" : ""
                        )
                      }
                    >
                      Sign In
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        clsx(
                          "w-full py-2.5 font-medium leading-5 ",
                          selected ? "bg-indigo-700 text-white" : ""
                        )
                      }
                    >
                      Sign Up
                    </Tab>
                  </Tab.List>
                  <Tab.Panels className="mt-4">
                    <Tab.Panel title="signin form">
                      <SignInForm />
                    </Tab.Panel>
                    <Tab.Panel title="created account form">
                      <SignUpFrom />
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>


                <IconButton
                  variant="ghost"
                  aria-label="Close authentication dialog"
                  className="absolute top-2 right-2"
                  onClick={onClose}
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
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};