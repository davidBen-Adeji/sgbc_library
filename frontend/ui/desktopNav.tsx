import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import { categories } from "@/lib/categories";

export default function DesktopNav() {
  const [isDropdownVisible, setIsDropDownVisible] = useState(false);
  const pathName = usePathname();
  const ref = useRef<HTMLLIElement>(null);

  // Close when clicking outside
  useClickOutside(ref, () => {
    setIsDropDownVisible(false);
  });

  function handleToggleDropdown() {
    setIsDropDownVisible((prevVal) => !prevVal);
  }

  return (
    <nav className="mt-5">
      <ul className="flex gap-4">
        <li className={clsx(pathName === "/authors" && "font-bold")}>
          <Link href="/authors">Authors</Link>
        </li>
        <li className="relative" ref={ref}>
          <span className="cursor-pointer" onClick={handleToggleDropdown}>
            Categories
            <Image
              src="/chevrondown.svg"
              alt="arrow button"
              height={15}
              width={15}
              className={clsx("inline ml-1")}
            />
          </span>
          {isDropdownVisible && (
            <ul
              className={clsx(
                "absolute z-50 bg-gray-100 rounded p-2 space-y-2 mt-4 w-[300px] right-0",
              )}
            >
              {categories.map((category) => (
                <li
                  key={category}
                  className="hover:bg-gray-400 focus:bg-gray-400 cursor-pointer p-2"
                >
                  <Link
                    onClick={handleToggleDropdown}
                    href={`/categories/${category}`}
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
}
