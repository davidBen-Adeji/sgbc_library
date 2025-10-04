import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { BookModel } from "@/models/book.model";
import { handleError } from "@/lib/handleError";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query")?.trim();
    const loc = searchParams.get("loc")?.trim();
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = 21;

    const skip = (page - 1) * limit;

    if (!query) {
      return NextResponse.json([], { status: 200 });
    }

    let data = BookModel.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { author: { $regex: query, $options: "i" } },
        { ISBN: { $regex: query, $options: "i" } },
      ],
    });

    if (loc && loc === "searchBox") {
      data = data.limit(10);
    } else {
      data = data.skip(skip).limit(limit);
    }

    const books = await data;

    const totalBooks = await BookModel.countDocuments({});
    const totalPages = Math.ceil(totalBooks / limit);

    return NextResponse.json({ books, totalPages }, { status: 200 });
  } catch (error) {
    return handleError("Failed to fetch books", error);
  }
}
