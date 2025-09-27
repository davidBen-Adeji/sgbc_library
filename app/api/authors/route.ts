import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Book } from "@/models/book.model";
import handleError from "@/lib/handleError";

export async function GET() {
  try {
    await connectDB();

    const authors = await Book.distinct("author");

    if (authors.length === 0) {
      return NextResponse.json(
        { message: "No authors found" },
        { status: 404 },
      );
    }

    return NextResponse.json(authors, { status: 200 });
  } catch (error) {
    console.error("Error fetching authors:", error);
    return handleError("Failed to fetch authors", error);
  }
}
