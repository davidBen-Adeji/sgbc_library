import { Book } from "@/lib/types";
import Image from "next/image";

export default function BookDetails({ book }: { book: Book }) {
  return (
    <article className="mt-8 max-w-2xl mx-auto md:flex justify-center items-start">
      <Image
        alt="book image"
        src="/bookimage.png"
        width={310}
        height={450}
        className="mx-auto"
      />
      <section className="p-3 space-y-3 max-w-xs mx-auto">
        <h1 className="text-xl font-bold">{book.title}</h1>
        <p className="font-semibold">Author: {book.author}</p>
        <p className="font-semibold">ISBN: {book.ISBN}</p>
        <p className="font-semibold">Publisher: {book.publisher}</p>
        <p className="font-semibold">Category: {book.category}</p>
        <p className="font-semibold">Collection: {book.bookCollection}</p>
        {/* <p className="font-semibold">Price: ${(book.price / 100).toFixed(2)}</p> */}
        <p className="text-gray-500">{book.description}</p>
      </section>
    </article>
  );
}
