import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import { Book } from "@/models/book.model";
import { bookSchema } from "@/lib/validations/book";
import { handleError } from "@/lib/handleError";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    await connectDB();

    const { id } = await params;

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
    return handleError("Failed to fetch book", error);
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const body = await request.json();
    const { id } = await params;
    // ✅ Full validation required
    const parsed = bookSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const updatedBook = await Book.findByIdAndUpdate(id, parsed.data, {
      new: true,
    });

    if (!updatedBook) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json(updatedBook, { status: 200 });
  } catch (error) {
    return handleError("Failed to update book", error);
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json(deletedBook, {
      status: 200,
    });
  } catch (error) {
    return handleError("Failed to delete book", error);
  }
}
