import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Book } from "@/models/book.model";
import handleError from "@/lib/handleError";

export async function GET() {
  try {
    await connectDB();

    // Fetch unique category names
    const categories = await Book.distinct("category");

    if (categories.length === 0) {
      return NextResponse.json(
        { message: "No categories found" },
        { status: 404 },
      );
    }

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return handleError("Failed to fetch categories", error);
  }
}
