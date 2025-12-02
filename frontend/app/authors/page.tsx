"use server";

import axios from "axios";
import { serverBaseURI } from "@/lib/baseURI";
import { authorsSchema } from "@/lib/validations/book";
import Link from "next/link";

export default async function Page() {
  const { data } = await axios.get(`${serverBaseURI}/books/authors`);
  const authors = authorsSchema.parse(data);
  return (
    <main className="w-container max-w-5xl mt-12 mx-auto">
      <h1 className="text-xl font-bold">Authors</h1>
      <ul className="mt-8 cursor-pointer flex flex-wrap gap-18">
        {authors.map((author) => (
          <li key={author}>
            <Link href={`/authors/${author}`}>{author}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
