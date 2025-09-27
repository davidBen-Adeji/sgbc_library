import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Book } from "@/models/book.model";

export async function GET() {
  try {
    await connectDB();
    const books = await Book.find({ collection: "SGBC Library" });

    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch sgbc books", details: error.message },
      { status: 500 },
    );
  }
}
