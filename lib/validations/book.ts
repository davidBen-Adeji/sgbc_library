// lib/validations/book.ts
import { z } from "zod";

export const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  collection: z.enum(["SGBC Library", "GTS"]),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional(),
  borrowTimes: z.number().min(0),
  ISBN: z.string().min(5, "ISBN is required"),
  availableCopies: z.number().min(0),
  copies: z.number().min(1),
  publisher: z.string().min(1, "Publisher is required"),
  imageURL: z.string().url().optional(),
});

// Infer TypeScript type from schema
export type BookInput = z.infer<typeof bookSchema>;
