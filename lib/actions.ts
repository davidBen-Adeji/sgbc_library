"use server";

import axios from "axios";
import { bookSchema } from "@/lib/validations/book";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface ActionState {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

export async function addBook(prevState: ActionState, formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = bookSchema.safeParse(raw);

  if (!parsed.success) {
    // Return validation errors to the client
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const book = parsed.data;

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/books`,
      book,
    );
  } catch (error) {
    console.error(error);
  }
  revalidatePath("/");
  redirect("/");

  return {
    success: true,
    message: "Book added successfully!",
  };
}
