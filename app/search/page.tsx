import axios from "axios";
import { booksSchema } from "@/lib/validations/book";
import { Book } from "@/lib/types";
import NotFound from "@/ui/notFound";
import Books from "@/ui/books";
import Pagination from "@/ui/pagination";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { page: string; query: string };
}) {
  const { page } = await searchParams;
  const currentPage = page || 1;
  const { query } = (await searchParams) || "";
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/search?query=${encodeURIComponent(query)}&page=${currentPage}`,
  );

  const { totalPages } = data;
  const books: Book[] = booksSchema.parse(data.books);

  return (
    <>
      <h1 className="w-minus-50 mx-auto mt-7 text-xl font-bold max-w-5xl">
        Showing search results for {`"${query}"`}
      </h1>
      {books.length === 0 ? <NotFound /> : <Books books={books} />}
      <Pagination
        currentPage={parseInt(currentPage)}
        totalPages={totalPages}
        basePath={`/search?query=${encodeURIComponent(query)}`}
      />
    </>
  );
}
