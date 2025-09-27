import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Book } from "@/models/book.model";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ category: string }> },
) {
  try {
    await connectDB();
    const { category } = await params;
    // Decode category for multi-word values
    const decodedCategory = decodeURIComponent(category);

    if (!decodedCategory || decodedCategory.trim() === "") {
      return NextResponse.json(
        { error: "Category is required" },
        { status: 400 },
      );
    }

    // Extract query params for collection
    const { searchParams } = new URL(req.url);
    const collectionQuery = searchParams.get("collection"); // e.g., "gts,sgbc"

    let collectionFilter: string[] = [];

    if (collectionQuery) {
      collectionFilter = collectionQuery.split(",").map((c) => c.trim());
    }

    // MongoDB filter
    const filter: Record<string> = {
      category: { $regex: new RegExp(`^${decodedCategory}$`, "i") },
    };

    if (collectionFilter.length > 0) {
      filter.collection = { $in: collectionFilter }; // e.g., ["gts", "sgbc"]
    }

    const books = await Book.find(filter);

    if (books.length === 0) {
      return NextResponse.json(
        {
          message: `No books found in category '${decodedCategory}' for collections: ${collectionFilter.join(", ")}`,
        },
        { status: 404 },
      );
    }

    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 },
    );
  }
}
