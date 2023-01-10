import clsx from "clsx";
import React from "react";

export default function Logo() {
  return (
    <span
      className={clsx(
        "bg-gradient-to-r from-fuchsia-800 via-purple-600 to-indigo-800 bg-clip-text align-middle text-3xl font-black text-transparent"
      )}
    >
      Teksade
    </span>
  );
}
