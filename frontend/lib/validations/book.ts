import { z } from "zod";

export const bookSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  bookCollection: z.enum(["SGBC", "GTS"]),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional(),
  borrowTimes: z.coerce.number().min(0, "number must be at least 0"),
  ISBN: z.string().min(5, "ISBN is required"),
  availableCopies: z.coerce
    .number()
    .min(0, "Available copies must be at least 0"),
  copies: z.coerce.number().min(1, "Copies must be at least 1"),
  publisher: z.string().min(1, "Publisher is required"),
  imageURL: z.string().url().optional(),
  price: z.coerce.number().min(1, "price must be at least 1"),
});

export const authorsSchema = z.array(z.string());

export const booksSchema = z.array(bookSchema);
