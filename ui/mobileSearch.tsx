"use client";

import clsx from "clsx";

import Image from "next/image";

export default function MobileSearch({ isVisible, onToggleSearch }) {
  return (
    <article
      className={clsx(
        "w-screen h-screen fixed top-0 z-50 bg-white ",
        !isVisible && "left-[100%]",
        isVisible && "left-0",
      )}
    >
      <Image src="/close.svg" alt="close button" width={25} height={25} />
      <search>
        <form>
          <input
            type="search"
            placeholder="Book, ISBN, Author"
            className={clsx(
              "border border-gray-400 outline-0 focus:ring-1 focus:ring-blue-500 rounded-3xl py-2 px-4",
            )}
          />
        </form>
      </search>
    </article>
  );
}
