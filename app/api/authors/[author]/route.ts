import { FilterQuery } from "mongoose";
import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { BookModel } from "@/models/book.model";
import { handleError } from "@/lib/handleError";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ author: string }> },
) {
  try {
    await connectDB();
    const { author } = await params;
    // Decode category for multi-word values
    const decodedAuthor = decodeURIComponent(author);

    if (!decodedAuthor || decodedAuthor.trim() === "") {
      return NextResponse.json(
        { error: "Author is required" },
        { status: 400 },
      );
    }

    // Extract query params for collection
    const { searchParams } = new URL(req.url);
    const collectionQuery = searchParams.get("collection"); // e.g., "gts,sgbc"
    const limit = searchParams.get("limit")?.trim();

    let collectionFilter: string[] = [];

    if (collectionQuery) {
      collectionFilter = collectionQuery.split(",").map((c) => c.trim());
    }

    // MongoDB filter
    const filter: FilterQuery<typeof BookModel> = {
      author: { $regex: new RegExp(`^${decodedAuthor}$`, "i") },
    };

    if (collectionFilter.length > 0) {
      filter.bookCollection = { $in: collectionFilter }; // e.g., ["gts", "sgbc"]
    }

    let data = BookModel.find(filter);

    if (limit && limit === "3") {
      data = data.limit(3);
    }

    const books = await data;

    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    console.error("Error fetching books:", error);
    return handleError("Failed to fetch books", error);
  }
}
