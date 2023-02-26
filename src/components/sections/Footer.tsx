import React from "react";
import Link from "next/link";
import Logo from "../Logo";

export const Footer = () => {
  return (
    <footer className="p-4 md:px-6 md:py-8">
      <div className="flex flex-col items-center justify-between sm:flex-row">
        <Link href="/#">
          <a className="my-auto flex w-[140px] md:ml-0">
            <Logo />
          </a>
        </Link>
        <ul className="mb-6 flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 sm:mb-0">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              About
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              Communities
            </a>
          </li>
          <li>
            <a
              href="https://github.com/ondiekelijah/teksade/blob/master/contribution.md"
              target="_blank"
              rel="noreferrer"
              className="mr-4 hover:underline md:mr-6 "
            >
              Contribute
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
      <hr className="my-6 border-gray-200 dark:border-gray-700 lg:my-8" />
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
      <span className="block text-sm text-gray-500 dark:text-gray-400">
        <a
          href="https://github.com/ondiekelijah/teksade"
          className="hover:underline"
        >
          Teksade™
        </a>
        . All Rights Reserved.
      </span>
      </div>
    </footer>
  );
};
