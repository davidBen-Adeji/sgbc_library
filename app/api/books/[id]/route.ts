import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import { Book } from "@/models/book.model";
import { Params } from "@/lib/types";
import { bookSchema } from "@/lib/validations/book";

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

export async function PUT(request: Request, { params }: Params) {
  try {
    await connectDB();
    const body = await request.json();

    // ✅ Full validation required
    const parsed = bookSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const updatedBook = await Book.findByIdAndUpdate(params.id, parsed.data, {
      new: true,
    });

    if (!updatedBook) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json(updatedBook);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update book" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    await connectDB();
    const deletedBook = await Book.findByIdAndDelete(params.id);

    if (!deletedBook) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json(deletedBook, {
      message: "Book deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete book" },
      { status: 500 },
    );
  }
}
