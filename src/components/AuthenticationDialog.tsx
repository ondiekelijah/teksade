import React, { Fragment } from "react";
import { Dialog, Tab, Transition } from "@headlessui/react";
import clsx from "clsx";
import Logo from "./Logo";
import { Button, IconButton } from "./Button";
import Input from "./Input";

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
              <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all dark:bg-gray-800">
                <span className="mx-auto flex w-[140px] ">
                  <Logo />
                </span>
                <Tab.Group>
                  <Tab.List className="mt-4 flex overflow-hidden rounded-lg bg-indigo-100 dark:text-gray-500">
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

                <div className="my-4 flex items-center">
                  <span className="block h-0.5 w-full bg-slate-400"></span>
                  <span className="relative px-3 text-lg font-semibold">
                    Or
                  </span>
                  <span className="block h-0.5 w-full bg-slate-400"></span>
                </div>

                <div className="space-y-3">
                  <Button fullWidth variant="outline">
                    <FacebookColorfulIcon className="h-6 w-6" />
                    <span className="pl-2"> continue with facebook</span>
                  </Button>
                  <Button fullWidth variant="outline">
                    <GoogleColorfulIcon className="h-6 w-6" />
                    <span className="pl-2"> continue with google</span>
                  </Button>
                  <Button fullWidth variant="outline">
                    <LinkedinColorfulIcon className="h-6 w-6" />
                    <span className="pl-2"> continue with linkedin</span>
                  </Button>
                </div>

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

const SignInForm = () => {
  return (
    <div className="rounded-tr-4xl px-10 pt-4 pb-4">
      <h1 className="text-2xl font-semibold">Welcome back!</h1>
      <form className="mt-6 space-y-6" autoComplete="off">
        <Input
          name="email"
          id="email"
          type="email"
          placeholder="Email address"
          isInvalid={false}
          errorText="invalid email"
        />

        <Input
          name="password"
          id="password"
          type="password"
          placeholder="Password"
          isInvalid={false}
          errorText="invalid password"
        />

        <Button type="submit" fullWidth>
          Sign in
        </Button>
      </form>

      <a
        href="#"
        className="mt-4 block transition-all duration-150 hover:font-semibold hover:text-indigo-800 hover:underline dark:text-gray-300 dark:hover:text-white"
      >
        Forgot your password ?
      </a>
    </div>
  );
};

const SignUpFrom = () => {
  return (
    <div className="rounded-tr-4xl px-10 pt-4 pb-4">
      <h1 className="text-2xl font-semibold">Register free!</h1>
      <form className="mt-6 space-y-6" autoComplete="off">
        <Input
          name="email"
          id="email"
          type="email"
          placeholder="Email address"
          isInvalid={false}
          errorText="invalid email"
        />

        <Input
          name="password"
          id="password"
          type="password"
          placeholder="Password"
          isInvalid={false}
          errorText="invalid password"
        />

        <Button type="submit" fullWidth>
          Sign Up
        </Button>
      </form>

      <p className="mt-4 text-sm">
        By clicking “Sign Up” above, you acknowledge that you have read and
        agreed to our{" "}
        <a
          href=""
          className="font-semibold underline hover:text-indigo-700 dark:hover:text-indigo-400"
        >
          {" "}
          Terms & Conditions
        </a>{" "}
        and{" "}
        <a
          href=""
          className="font-semibold underline hover:text-indigo-700 dark:hover:text-indigo-400"
        >
          {" "}
          Privacy Policy
        </a>{" "}
        .
      </p>
    </div>
  );
};

function FacebookColorfulIcon(props: React.SVGProps<SVGSVGElement>) {
  const { height, width, ...otherProps } = props;

  return (
    <svg viewBox="0 0 512 512" height={height} width={width} {...otherProps}>
      <g>
        <path
          fill="#1877f2"
          d="M512,256c0,-141.385 -114.615,-256 -256,-256c-141.385,0 -256,114.615 -256,256c0,127.777 93.616,233.685 216,252.89l0,-178.89l-65,0l0,-74l65,0l0,-56.4c0,-64.16 38.219,-99.6 96.695,-99.6c28.009,0 57.305,5 57.305,5l0,63l-32.281,0c-31.801,0 -41.719,19.733 -41.719,39.978l0,48.022l71,0l-11.35,74l-59.65,0l0,178.89c122.385,-19.205 216,-125.113 216,-252.89Z"
        />
        <path
          d="M355.65,330l11.35,-74l-71,0l0,-48.022c0,-20.245 9.917,-39.978 41.719,-39.978l32.281,0l0,-63c0,0 -29.297,-5 -57.305,-5c-58.476,0 -96.695,35.44 -96.695,99.6l0,56.4l-65,0l0,74l65,0l0,178.89c13.033,2.045 26.392,3.11 40,3.11c13.608,0 26.966,-1.065 40,-3.11l0,-178.89l59.65,0Z"
          fill="#fff"
        />
      </g>
    </svg>
  );
}
function LinkedinColorfulIcon(props: React.SVGProps<SVGSVGElement>) {
  const { height, width, ...otherProps } = props;

  return (
    <svg viewBox="0 0 32 32" height={height} width={width} {...otherProps}>
      <g>
        <circle
          clipRule="evenodd"
          cx="16"
          cy="16"
          fill="#007BB5"
          fillRule="evenodd"
          r="16"
        />
        <g>
          <rect fill="#FFFFFF" height="14" width="4" x="7" y="11" />
          <path
            d="M20.499,11c-2.791,0-3.271,1.018-3.499,2v-2h-4v14h4v-8c0-1.297,0.703-2,2-2c1.266,0,2,0.688,2,2v8h4v-7    C25,14,24.479,11,20.499,11z"
            fill="#FFFFFF"
          />
          <circle cx="9" cy="8" fill="#FFFFFF" r="2" />
        </g>
      </g>
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
    </svg>
  );
}
function GoogleColorfulIcon(props: React.SVGProps<SVGSVGElement>) {
  const { height, width, ...otherProps } = props;

  return (
    <svg viewBox="0 0 128 128" height={height} width={width} {...otherProps}>
      <g id="_x31__stroke">
        <g id="Google">
          <rect
            clipRule="evenodd"
            fill="none"
            fillRule="evenodd"
            height="128"
            width="128"
          />
          <path
            clipRule="evenodd"
            d="M27.585,64c0-4.157,0.69-8.143,1.923-11.881L7.938,35.648    C3.734,44.183,1.366,53.801,1.366,64c0,10.191,2.366,19.802,6.563,28.332l21.558-16.503C28.266,72.108,27.585,68.137,27.585,64"
            fill="#FBBC05"
            fillRule="evenodd"
          />
          <path
            clipRule="evenodd"
            d="M65.457,26.182c9.031,0,17.188,3.2,23.597,8.436L107.698,16    C96.337,6.109,81.771,0,65.457,0C40.129,0,18.361,14.484,7.938,35.648l21.569,16.471C34.477,37.033,48.644,26.182,65.457,26.182"
            fill="#EA4335"
            fillRule="evenodd"
          />
          <path
            clipRule="evenodd"
            d="M65.457,101.818c-16.812,0-30.979-10.851-35.949-25.937    L7.938,92.349C18.361,113.516,40.129,128,65.457,128c15.632,0,30.557-5.551,41.758-15.951L86.741,96.221    C80.964,99.86,73.689,101.818,65.457,101.818"
            fill="#34A853"
            fillRule="evenodd"
          />
          <path
            clipRule="evenodd"
            d="M126.634,64c0-3.782-0.583-7.855-1.457-11.636H65.457v24.727    h34.376c-1.719,8.431-6.397,14.912-13.092,19.13l20.474,15.828C118.981,101.129,126.634,84.861,126.634,64"
            fill="#4285F4"
            fillRule="evenodd"
          />
        </g>
      </g>
    </svg>
  );
}
