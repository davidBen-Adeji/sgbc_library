import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import { Book } from "@/models/book.model";
import { Params } from "@/lib/types";

export async function GET(req: Request, { params }: Params) {
  try {
    await connectDB();

    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid book ID format" },
        { status: 400 },
      );
    }

    const book = await Book.findById(id);

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json(book, { status: 200 });
  } catch (error) {
    console.error("Error fetching single book:", error);
    return NextResponse.json(
      { error: "Failed to fetch book" },
      { status: 500 },
    );
  }
}
