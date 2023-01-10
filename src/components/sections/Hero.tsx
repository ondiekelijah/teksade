import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button, IconButton } from "../Button";
import { Transition } from "@headlessui/react";

const Hero = () => {
  const [showBanner, setShowBanner] = useState(true);
  return (
    <>
      <div className="relative h-screen w-full bg-red-500/20 md:h-screen">
        <Image
          src="/img/hero.jpg"
          alt="corporate"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-neutral-900/70">
          <div className="mx-auto max-w-screen-lg">
            <div className="m-6 min-h-[60px]">
              <HeroInnerBanner
                show={showBanner}
                onClose={() => setShowBanner(false)}
              />
            </div>
            <div className="mx-4 mt-16 flex flex-col items-center text-center">
              <h1 className="text-white font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
              Discover the most vibrant and engaged tech communities.
              </h1>
              <span className="mt-6 text-xl text-white sm:text-2xl">
              {/* Empowering the tech community, one connection at a time. Find your community. */}
              Find your place among like-minded individuals.
              </span>
              <div className="mt-8">
                <SearchForm />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <HeroBottomCard /> */}
    </>
  );
};

export default Hero;

const HeroInnerBanner: React.FC<{ show: boolean; onClose: () => void }> = ({
  show,
  onClose,
}) => {
  return (
    <Transition
      show={show}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="relative rounded bg-gradient-to-r from-purple-500 to-indigo-800 py-3 px-8 text-center text-white shadow-lg md:rounded-full">
      <p>
          Welcome to <span className="font-bold">Teksade</span>. An easier and
          faster tech community discovery platform.
        </p>
        <span className="absolute top-1 right-1 sm:top-2 sm:right-2">
          <IconButton
            aria-label="close banner"
            variant="ghost"
            size="sm"
            onClick={onClose}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </span>
      </div>
    </Transition>
  );
};

const items = ["GDG Nairobi", "Lux Tech Academy", "Flutter Nairobi"];

const SearchForm = () => {
  const [query, setQuery] = useState("");
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    let index = 0;
    let interval = setInterval(() => {
      if (!isDirty) {
        let value = items[index >= items.length ? (index = 0) : index];
        setQuery(value);
      }
      index++;
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [isDirty]);

  return (
    <form
      className="group"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div
        id="form-control"
        className="flex items-center overflow-hidden rounded-full bg-white shadow-md group-focus-within:ring-2 group-focus-within:ring-indigo-400 group-focus-within:ring-offset-2 group-focus-within:ring-offset-transparent"
      >
        <span className="pointer-events-none block px-2 text-slate-400 group-focus-within:text-indigo-800">
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
        <input
          className="w-full appearance-none border-transparent p-2 text-xl leading-6 text-slate-900 placeholder-slate-400 focus:border-transparent focus:ring-0"
          type="text"
          aria-label="Search input"
          placeholder="Search for a community"
          onClick={() => {
            if (!isDirty) {
              setIsDirty(true);
              setQuery("");
            }
          }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="hidden h-11 shrink-0 bg-indigo-600 px-2 font-semibold text-white transition-colors duration-500 ease-in-out hover:bg-indigo-700 sm:block"
        >
          Discover Now
        </button>
      </div>
      <Button size="lg" type="submit" className="mt-8 sm:hidden">
        Discover Now
      </Button>
    </form>
  );
};

function HeroBottomCard() {
  return (
    <div className="bg-neutral-900 p-4">
      <span className="block text-center text-lg text-white">
      Do you know a favorite community not listed?{" "}
        <span className="bg-gradient-to-r from-fuchsia-700 via-purple-500 to-indigo-500 bg-clip-text align-start text-2xl font-black tracking-widest text-transparent">
        Register
        </span>{" "}
        a new community.
      </span>
    </div>
  );
}
