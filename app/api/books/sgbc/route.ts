import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Book } from "@/models/book.model";
import { handleError } from "@/lib/handleError";

export async function GET() {
  try {
    await connectDB();
    const books = await Book.find({ collection: "SGBC Library" });

    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    return handleError("Failed to fetch SGBC books", error);
  }
}
