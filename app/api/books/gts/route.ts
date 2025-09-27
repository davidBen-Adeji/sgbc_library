import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Book } from "@/models/book.model";

export async function GET() {
  try {
    await connectDB();
    const books = await Book.find({ collection: "GTS" });

    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch gts books", details: error.message },
      { status: 500 },
    );
  }
}
