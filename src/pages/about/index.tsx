import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <div className="container mx-auto px-5 py-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="mx-auto w-full rounded-lg p-6 shadow-md">
            <Image src="/img/hero.jpg" className="mx-auto h-full w-full rounded-lg object-cover object-center" alt="" width={500} height={350} />
          </div>

          <div className="rounded-lg p-6 shadow-md">
            <div className="sm:border-lg sm:mb-0 sm:border-blue-300">
              <h2 className="pb-4 text-2xl font-bold text-gray-500 dark:text-gray-500 sm:text-2xl md:text-5xl">Become Part of Something Bigger</h2>
              <p className="pb-3 text-justify text-gray-500 dark:text-gray-400 sm:mt-6 sm:pb-0">
                We believe in creating opportunities for individuals to become part of something bigger. Join us and be a member of a community that explores new opportunities and expands horizons.{" "}
              </p>
              <p className="pb-3 text-justify text-gray-500 dark:text-gray-400 sm:mt-6 sm:pb-0">
                Unlock your potential and become part of a thriving network that embraces boundless opportunities and limitless growth. Join us and be a valued member of a community that dares to
                dream big and embraces the endless possibilities ahead.
              </p>
            </div>
            <div className="my-4 sm:mt-4 sm:p-0 md:mt-6">
              <div className="flex items-center">
                <svg
                  className="mr-2 cursor-pointer text-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle> <line x1="8" y1="12" x2="16" y2="12"></line> <line x1="12" y1="8" x2="12" y2="16"></line>{" "}
                </svg>
                <div>
                  <p>
                    Explore new opportunities and expand your horizons with <span className="cursor-pointer text-purple-700">Teksade</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center sm:mt-3">
                <svg
                  className="mr-2 cursor-pointer text-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  {" "}
                  <circle cx="8" cy="12" r="7"></circle> <circle cx="16" cy="12" r="7"></circle> <line x1="8" y1="12" x2="16" y2="12"></line>{" "}
                </svg>
                <div>
                  <p>Join Teksade and be part of a community that uplifts.</p>
                </div>
              </div>
            </div>
            <div className="mb-0 sm:mt-8">
              <div>
                <div className="flex items-center">
                  <div className="h-1 w-1/3 bg-gray-400"></div>
                  <h4 className="md:text-1xl p-2">We're Social</h4>
                  <div className="h-1 w-1/3 bg-gray-400"></div>
                </div>
              </div>
              <div className="flex justify-center pt-4 sm:mt-4 md:justify-start">
                <svg
                  className="mx-3 h-8 w-8 cursor-pointer text-blue-500 hover:text-blue-200 hover:transition-all  hover:duration-300 sm:h-10 sm:w-10"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="24"
                  height="24"
                >
                  <path d="M20.75 0h-18.5C1.56 0 .4 1.2.4 2.66v18.68c0 1.46 1.16 2.66 2.61 2.66h18.5c1.44 0 2.6-1.2 2.6-2.66V2.66c0-1.46-1.16-2.66-2.61-2.66zM7.63 19.3h-3v-8.54h3zM5.67 9.94c-1 0-1.7-.67-1.7-1.51 0-.85.7-1.51 1.74-1.51s1.7.66 1.7 1.51c0 .84-.7 1.51-1.74 1.51zM20 19.3h-3v-5.55c0-1.4-.5-2.34-1.74-2.34-.94 0-1.5.63-1.74 1.25-.1.2-.1.47-.1.74v5.9h-3c.05-10.08 0-11.24 0-11.24h3v1.58c.4-.62 1.13-1.5 2.74-1.5 2 0 3.5 1.28 3.5 4.02v6.14z" />
                </svg>
                <svg
                  className="mx-3 h-8 w-8 cursor-pointer text-blue-500 hover:text-blue-300 hover:transition-all  hover:duration-300 sm:h-10 sm:w-10"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="twitter"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z"
                  ></path>
                </svg>
                <svg
                  className="h-8 w-8 cursor-pointer text-black hover:text-gray-500 hover:transition-all  hover:duration-300 sm:h-10 sm:w-10"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="github"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496 512"
                >
                  <path
                    fill="currentColor"
                    d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
