"use client";

import Link from "next/link";
import { Book } from "@/lib/types";

interface SearchResultProps {
  result: Book;
  onToggleSearch: (value: boolean) => void;
}

export default function SearchResult({
  result,
  onToggleSearch,
}: SearchResultProps) {
  return (
    <Link
      key={result._id}
      href={`/${result._id}`}
      onClick={() => onToggleSearch(false)}
      className="block mt-4 cursor-pointer p-2 hover:bg-gray-200/50 focus:bg-gray-200/50"
    >
      <li className="space-y-1">
        <p className="font-semibold">{result.title}</p>
        <p className="text-sm text-gray-500">{result.author}</p>
      </li>
    </Link>
  );
}
