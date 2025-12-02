import Books from "@/ui/books";
import Pagination from "@/ui/pagination";
import { fetchBooks } from "@/lib/actions";

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

  const { totalPages, books } = await fetchBooks(
    `page=${currentPage}`,
    `categories/${category}`,
  );

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
