import axios from "axios";
import { booksSchema, bookSchema } from "@/lib/validations/book";
import { serverBaseURI } from "@/lib/baseURI";

export async function fetchBooks(params: string, route: string = "") {
  try {
    const { data } = await axios.get(
      `${serverBaseURI}/books/${route}?${params}`,
    );
    const totalPages = data.totalPages;
    const books = booksSchema.parse(data.books);

    return { totalPages, books };
  } catch (err) {
    console.error("An error occured", err);
    throw err;
  }
}

export async function fetchBook(id: string) {
  try {
    const { data } = await axios.get(`${serverBaseURI}/books/${id}`);
    const book = bookSchema.parse(data);

    return book;
  } catch (err) {
    console.error("An error occured", err);
    throw err;
  }
}
