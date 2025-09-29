import { z } from "zod";
import { bookSchema } from "@/lib/validations/book";

// Infer TypeScript type from schema
export type Book = z.infer<typeof bookSchema>;
