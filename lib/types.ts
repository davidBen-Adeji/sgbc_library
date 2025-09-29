import { z } from "zod";

// Infer TypeScript type from schema
export type Book = z.infer<typeof bookSchema>;
