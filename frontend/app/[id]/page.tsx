import BookDetails from "@/app/[id]/ui/bookDetails";
import BooksSkeleton from "@/ui/booksSkeleton";
import { Suspense } from "react";
import BookSuggestions from "@/ui/bookSuggestions";
import { fetchBook } from "@/lib/actions";

interface Props {
  params: {
    id: string;
  };
}

export default async function BookDetailsPage({ params }: Props) {
  const { id } = await params;

  const book = await fetchBook(id);

  return (
    <main className="pb-8">
      <BookDetails book={book} />
      <Suspense fallback={<BooksSkeleton />}>
        <BookSuggestions
          caption={`Books by ${book.author}`}
          apiRoute={`books/authors/${book.author}?limit=4`}
          btnHref={`/authors/${book.author}`}
        />
      </Suspense>
      <Suspense fallback={<BooksSkeleton />}>
        <BookSuggestions
          caption={`Books on ${book.category}`}
          apiRoute={`books/categories/${book.category}?limit=4`}
          btnHref={`/categories/${book.category}`}
        />
      </Suspense>
    </main>
  );
}
