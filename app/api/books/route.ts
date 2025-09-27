import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Book } from "@/models/book.model";
import { bookSchema } from "@/lib/validations/book";

export async function GET() {
  try {
    await connectDB();
    const books = await Book.find();

    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch books", details: error.message },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const parsed = bookSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const newBook = await Book.create(parsed.data);
    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create book" },
      { status: 500 },
    );
  }
}
