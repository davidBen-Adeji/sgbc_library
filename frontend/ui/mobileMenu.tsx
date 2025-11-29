"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface MobileMenuProps {
  isVisible: boolean;
  onToggleMenu: (value: boolean) => void;
}

const categories: string[] = [
  "New Testament Commentary",
  "Old Testament Commentary",
  "References (Dictionaries, Concordance e.t.c)",
  "Biblical Counselling",
  "History & Biography",
  "Apologetics",
  "The Christian Life",
  "Selected Works",
  "Church Doctrine & Theology",
];

export default function MobileSearch({
  isVisible,
  onToggleMenu,
}: MobileMenuProps) {
  const [isDropdownVisible, setIsDropDownVisible] = useState(false);
  const pathName = usePathname();

  function handleToggleMenu() {
    onToggleMenu(false);
  }

  function handleToggleDropdown() {
    setIsDropDownVisible((prevVal) => !prevVal);
  }

  return (
    <article
      className={clsx(
        "fixed left-0 right-0 bottom-0 top-0 z-50 bg-white transition-all duration-300 overflow-y-scroll px-6 py-2",
        isVisible ? "left-0" : "left-[100%]",
      )}
    >
      <Image
        src="/close.svg"
        alt="close button"
        width={30}
        height={30}
        className="mt-2 cursor-pointer"
        onClick={handleToggleMenu}
      />
      <menu className="text-lg mt-20 space-y-4">
        <li
          onClick={handleToggleMenu}
          className={clsx(pathName === "/" && "font-bold")}
        >
          <Link href="/">Home</Link>
        </li>
        <li
          onClick={handleToggleMenu}
          className={clsx(pathName === "/authors" && "font-bold")}
        >
          <Link href="/authors">Authors</Link>
        </li>
        <li>
          <span onClick={handleToggleDropdown}>
            Categories
            <Image
              src="/chevrondown.svg"
              alt="arrow button"
              height={15}
              width={15}
              className={clsx("inline ml-2")}
            />
          </span>
          <ul
            className={clsx(
              "bg-gray-100 rounded p-2 space-y-2 mt-4",
              !isDropdownVisible && "hidden",
            )}
          >
            {categories.map((category) => (
              <li
                key={category}
                className="hover:bg-gray-400 focus:bg-gray-400 cursor-pointer p-2"
                onClick={handleToggleMenu}
              >
                <Link href={`/categories/${category}`}>{category}</Link>
              </li>
            ))}
          </ul>
        </li>
      </menu>
    </article>
  );
}
