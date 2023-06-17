import Image from "next/image";
import HeroInnerBanner from "./NewsBanner";
import SearchForm from "./SearchForm";
import { useState } from "react";

const HeroContent = ({ notificationIsVisible }) => (
  <div
    className={`${
      !notificationIsVisible ? "-mt-20" : ""
    } flex flex-col items-center text-center lg:mt-0`}
  >
    <h1 className="text-center text-4xl font-extrabold tracking-tight text-white dark:text-white sm:text-5xl lg:text-6xl">
      Discover the most vibrant and engaged tech communities.
    </h1>
    <span className="mt-6 text-xl text-white sm:text-2xl">
      Find your place among like-minded individuals.
    </span>
    <SearchFormWrapper />
  </div>
);

const SearchFormWrapper = () => (
  <div className="mt-8">
    <SearchForm />
  </div>
);

const Hero = () => {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className="relative flex min-h-[90vh] w-full items-center justify-center bg-red-500/20 ">
      <div className="absolute inset-0 z-10">
        <Image
          src="/img/hero.jpg"
          alt="corporate"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="absolute inset-0 z-20 flex items-center justify-center bg-neutral-900/70">
        <div className="mx-auto flex h-full max-w-screen-lg flex-col items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
          <div className="min-h-[60px]">
            <HeroInnerBanner
              show={showBanner}
              onClose={() => setShowBanner(false)}
            />
          </div>
          <HeroContent notificationIsVisible={showBanner} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
