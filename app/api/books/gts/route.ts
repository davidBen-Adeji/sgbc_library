import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { BookModel } from "@/models/book.model";
import { handleError } from "@/lib/handleError";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = 21;

    const skip = (page - 1) * limit;
    const books = await BookModel.find({ bookCollection: "GTS" })
      .skip(skip)
      .limit(limit);

    const totalBooks = await BookModel.countDocuments({});
    const totalPages = Math.ceil(totalBooks / limit);

    return NextResponse.json({ books, totalPages }, { status: 200 });
  } catch (error) {
    return handleError("Failed to fetch GTS books", error);
  }
}
