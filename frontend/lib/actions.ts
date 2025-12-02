import axios from "axios";
import { booksSchema, bookSchema } from "@/lib/validations/book";
import { serverBaseURI } from "@/lib/baseURI";
import { Book } from "@/lib/types";

export async function fetchBooks(
  params: string,
  route: string = "",
): Promise<{ totalPages: number; books: Book[] }> {
  try {
    const { data } = await axios.get(
      `${serverBaseURI}/books/${route}?${params}`,
    );
    const totalPages: number = data.totalPages;
    const books: Book[] = booksSchema.parse(data.books);

    return { totalPages, books };
  } catch (err) {
    console.error("An error occured", err);
    throw err;
  }
}

export async function fetchBook(id: string): Promise<Book> {
  try {
    const { data } = await axios.get(`${serverBaseURI}/books/${id}`);
    const book: Book = bookSchema.parse(data);

    return book;
  } catch (err) {
    console.error("An error occured", err);
    throw err;
  }
}
