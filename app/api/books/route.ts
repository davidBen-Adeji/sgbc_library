import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Book } from "@/models/book.model";
import { bookSchema } from "@/lib/validations/book";
import { handleError } from "@/lib/handleError";

export async function GET() {
  try {
    await connectDB();
    const books = await Book.find();

    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    return handleError("Failed to fetch books", error);
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
    return handleError("Failed to create book", error);
  }
}
