import axios from "axios";
import Books from "@/ui/books";
import Link from "next/link";
import { booksSchema } from "@/lib/validations/book";
import { serverBaseURI } from "@/lib/baseURI";
import { Book } from "@/lib/types";

export default async function BookSuggestions({
  caption,
  apiRoute,
  btnHref,
}: {
  caption: string;
  apiRoute: string;
  btnHref: string;
}) {
  const { data } = await axios.get(`${serverBaseURI}/${apiRoute}`);
  const books: Book[] = booksSchema.parse(data);
  return (
    <article className="mt-12">
      <h1 className="text-xl font-bold w-container max-w-5xl mx-auto">
        {caption}
      </h1>
      {books.length === 0 ? (
        <p className="text-gray-500 mt-4">No other books available</p>
      ) : (
        <>
          <Books books={books} />
          <Link
            href={btnHref}
            className="bg-blue-500 w-fit block mx-auto py-4 px-6 text-white font-semibold cursor-pointer rounded-lg hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
          >
            See More
          </Link>
        </>
      )}
    </article>
  );
}
