import Books from "@/ui/books";
import Pagination from "@/ui/pagination";
import { fetchBooks } from "@/lib/actions";
import { Book } from "@/lib/types";

interface Props {
  params: {
    category: string;
  };
  searchParams: {
    page: string;
  };
}

export default async function Page({ params, searchParams }: Props) {
  const { category } = await params;
  const { page } = await searchParams;

  let currentPage = parseInt(page);
  if (!currentPage || currentPage < 1) {
    currentPage = 1;
  }

  const data: { totalPages: number; books: Book[] } = await fetchBooks(
    `page=${currentPage}`,
    `categories/${category}`,
  );
  const totalPages = data.totalPages;
  const books: Book[] = data.books;

  return (
    <>
      <h1 className="mt-12 text-xl w-container max-w-5xl mx-auto font-bold">
        Books based on {decodeURIComponent(category)}
      </h1>
      <Books books={books} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath={`/categories/${category}?`}
      />
    </>
  );
}
