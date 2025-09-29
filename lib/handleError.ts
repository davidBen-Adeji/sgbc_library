import { NextResponse } from "next/server";

export function handleError(context: string, error: unknown) {
  if (error instanceof Error) {
    console.error(error.message);
    return NextResponse.json(
      { error: context, details: error.message },
      { status: 500 },
    );
  }
  console.error(error);

  return NextResponse.json(
    { error: context, details: String(error) },
    { status: 500 },
  );
}
