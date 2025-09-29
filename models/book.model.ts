import mongoose, {
  Schema,
  model,
  models,
  Model,
  InferSchemaType,
} from "mongoose";

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    bookCollection: {
      type: String,
      enum: {
        values: ["SGBC Library", "GTS"],
        message: "Collection must be either 'sgbc' or 'gts'",
      },
      required: [true, "Collection is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    description: {
      type: String,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
      trim: true,
    },
    borrowTimes: {
      type: Number,
      default: 0,
      min: [0, "Borrow times cannot be negative"],
    },
    ISBN: {
      type: String,
      unique: true,
      required: [true, "ISBN is required"],
      trim: true,
    },
    availableCopies: {
      type: Number,
      required: [true, "Available copies count is required"],
      min: [0, "Available copies cannot be negative"],
    },
    copies: {
      type: Number,
      required: [true, "Total copies count is required"],
      min: [1, "There must be at least one copy"],
    },
    publisher: {
      type: String,
      required: [true, "Publisher is required"],
      trim: true,
    },
    imageURL: {
      type: String,
      trim: true,
      validate: {
        validator: function (v: string) {
          return /^https?:\/\/.+/.test(v);
        },
        message: "Invalid image URL format",
      },
    },
  },
  { timestamps: true },
);

bookSchema.index({ title: 1 });
bookSchema.index({ author: 1 });

export type BookType = InferSchemaType<typeof bookSchema>;

export const Book: Model<BookType> =
  models.Book || model<BookType>("Book", bookSchema);
