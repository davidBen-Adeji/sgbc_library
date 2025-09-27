import { NextResponse } from "next/server";

export function handleError(context: string, error: unknown) {
  if (error instanceof Error) {
    return NextResponse.json(
      { error: context, details: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { error: context, details: String(error) },
    { status: 500 },
  );
}
