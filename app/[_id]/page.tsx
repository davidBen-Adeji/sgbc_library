import { Book } from "@/lib/types";
import { bookSchema } from "@/lib/validations/book";
import axios from "axios";
import BookDetails from "@/app/[_id]/_ui/bookDetails";
import BooksSkeleton from "@/ui/booksSkeleton";
import { Suspense } from "react";
import BookSuggestions from "@/ui/bookSuggestions";

export default async function BookDetailsPage({
  params,
}: {
  params: { _id: string };
}) {
  const { _id } = await params;

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/books/${_id}`,
  );
  const book: Book = bookSchema.parse(data);

  return (
    <main className="w-minus-50 mx-auto pb-8">
      <BookDetails book={book} />
      <Suspense fallback={<BooksSkeleton />}>
        <BookSuggestions
          caption={`Books by ${book.author}`}
          apiRoute={`authors/${book.author}?limit=3`}
          btnHref={`authors/${book.author}`}
        />
      </Suspense>
      <Suspense fallback={<BooksSkeleton />}>
        <BookSuggestions
          caption={`Books based on ${book.category}`}
          apiRoute={`categories/${book.category}?limit=3`}
          btnHref={`categories/${book.category}`}
        />
      </Suspense>
    </main>
  );
}
