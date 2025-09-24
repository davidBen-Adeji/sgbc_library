import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Book } from "@/models/book.model";

export async function GET() {
  try {
    await connectDB();
    const books = await Book.find();

    return NextResponse.json(books, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch books", details: error.message },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();
    const newBook = await Book.create(data);
    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create book" },
      { status: 500 },
    );
  }
}
