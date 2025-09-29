"use client";

import Link from "next/link";
import { Book } from "@/lib/types";

export default function SearchResult({ result }: { result: Book }) {
  return (
    <Link
      key={result._id}
      href={`/books/${result._id}`} // adjust route
      className="block mt-4 cursor-pointer p-2 hover:bg-gray-200/50 focus:bg-gray-200/50"
    >
      <li>
        <p className="font-semibold">{result.title}</p>
        <p className="text-sm text-gray-500">{result.author}</p>
      </li>
    </Link>
  );
}
