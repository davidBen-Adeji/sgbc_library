import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Book } from "@/models/book.model";
import { handleError } from "@/lib/handleError";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    if (!query) {
      return NextResponse.json([], { status: 200 });
    }

    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { author: { $regex: query, $options: "i" } },
        { ISBN: { $regex: query, $options: "i" } },
      ],
    })
      .limit(10)
      .lean();

    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    return handleError("Failed to fetch books", error);
  }
}
