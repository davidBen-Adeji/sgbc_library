import mongoose, { Mongoose } from "mongoose";

const MONGO_URI = process.env.MONGODB_URI as string;

if (!MONGO_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local",
  );
}

// Define a strict cached type
interface Cached {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Augment globalThis with strict typing
declare global {
  // eslint-disable-next-line no-var
  var mongoose: Cached | undefined;
}

// Initialize the global cache or reuse it
const cached: Cached = global.mongoose ?? { conn: null, promise: null };
global.mongoose = cached;

export async function connectDB(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
