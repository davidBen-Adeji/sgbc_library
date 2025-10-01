import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Book } from "@/models/book.model";
import { handleError } from "@/lib/handleError";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query")?.trim();
    const loc = searchParams.get("loc")?.trim();

    if (!query) {
      return NextResponse.json([], { status: 200 });
    }

    let data = Book.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { author: { $regex: query, $options: "i" } },
        { ISBN: { $regex: query, $options: "i" } },
      ],
    });

    if (loc && loc === "searchBox") {
      data = data.limit(10);
    }

    data = data.lean();
    const books = await data;

    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    return handleError("Failed to fetch books", error);
  }
}
