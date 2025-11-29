import Books from "@/ui/books";
import Pagination from "@/ui/pagination";
import NotFound from "@/ui/notFound";
import { fetchBooks } from "@/lib/actions";
import { Book } from "@/lib/types";

interface Props {
  searchParams: { query: string; page: string };
}

export default async function Page({ searchParams }: Props) {
  const { query, page } = await searchParams;

  let currentPage = parseInt(page);
  if (!currentPage || currentPage < 1) {
    currentPage = 1;
  }

  const data: { totalPages: number; books: Book[] } = await fetchBooks(
    `query=${query}&page=${currentPage}`,
    "search",
  );
  const totalPages = data.totalPages;
  const books: Book[] = data.books;

  return (
    <>
      <h1 className="w-container mx-auto mt-12 text-xl font-bold max-w-5xl">
        Showing search results for {`"${query}"`}
      </h1>
      {books.length === 0 ? <NotFound /> : <Books books={books} />}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath={`/search?query=${query}`}
      />
    </>
  );
}
