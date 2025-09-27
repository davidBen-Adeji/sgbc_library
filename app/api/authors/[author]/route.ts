import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Book } from "@/models/book.model";
import { Params } from "@/lib/types";

export async function GET(req: Request, { params }: Params) {
  try {
    await connectDB();

    // Decode category for multi-word values
    const decodedAuthor = decodeURIComponent(params.author);

    if (!decodedAuthor || decodedAuthor.trim() === "") {
      return NextResponse.json(
        { error: "Author is required" },
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
      author: { $regex: new RegExp(`^${decodedAuthor}$`, "i") },
    };

    if (collectionFilter.length > 0) {
      filter.collection = { $in: collectionFilter }; // e.g., ["gts", "sgbc"]
    }

    const books = await Book.find(filter);

    if (books.length === 0) {
      return NextResponse.json(
        {
          message: `No author found in category '${decodedAuthor}' for collections: ${collectionFilter.join(", ")}`,
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
