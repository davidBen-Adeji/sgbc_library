import { NextRequest, NextResponse } from "next/server";
import { FilterQuery } from "mongoose";
import { connectDB } from "@/lib/mongodb";
import { Book } from "@/models/book.model";
import { handleError } from "@/lib/handleError";

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
    const limit = searchParams.get("limit")?.trim();

    let collectionFilter: string[] = [];

    if (collectionQuery) {
      collectionFilter = collectionQuery.split(",").map((c) => c.trim());
    }

    // MongoDB filter
    const filter: FilterQuery<typeof Book> = {
      category: { $regex: new RegExp(`^${decodedCategory}$`, "i") },
    };

    if (collectionFilter.length > 0) {
      filter.bookCollection = { $in: collectionFilter }; // e.g., ["gts", "sgbc"]
    }

    let data = Book.find(filter);

    if (limit && limit === "3") {
      data = data.limit(3);
    }

    const books = await data;

    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    console.error("Error fetching books:", error);
    return handleError("Failed to fetch category", error);
  }
}
