"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

interface Props {
  links: {
    caption: string;
    href: string;
  }[];
}

export default function NavLinks({ links }: Props) {
  const pathName = usePathname();

  return (
    <nav className="mt-12 w-container max-w-5xl mx-auto space-x-4 whitespace-nowrap">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={clsx(
            "font-medium py-2 px-3 rounded",
            pathName === link.href
              ? "bg-black text-white"
              : "bg-gray-100 text-black",
          )}
        >
          {link.caption}
        </Link>
      ))}
    </nav>
  );
}
