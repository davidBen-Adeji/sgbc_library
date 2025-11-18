import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Book extends Document {
  @Prop({
    type: String,
    required: [true, 'Book title is required'],
    trim: true,
  })
  title: string;

  @Prop({
    type: Number,
    required: [true, 'Price is required'],
    min: [1, 'Price must be at least 1'],
  })
  price: number;

  @Prop({
    type: String,
    required: [true, 'Author is required'],
    trim: true,
  })
  author: string;

  @Prop({
    type: String,
    enum: {
      values: ['SGBC Library', 'GTS'],
      message: "Collection must be either 'sgbc' or 'gts'",
    },
    required: [true, 'Collection is required'],
  })
  bookCollection: string;

  @Prop({
    type: String,
    required: [true, 'Category is required'],
    trim: true,
  })
  category: string;

  @Prop({
    type: String,
    maxlength: [1000, 'Description cannot exceed 1000 characters'],
    trim: true,
  })
  description: string;

  @Prop({
    type: Number,
    default: 0,
    min: [0, 'Borrow times cannot be negative'],
    required: true,
  })
  borrowTimes: number;

  @Prop({
    type: String,
    required: [true, 'ISBN is required'],
    trim: true,
  })
  ISBN: string;

  @Prop({
    type: Number,
    required: [true, 'Available copies count is required'],
    min: [0, 'Available copies cannot be negative'],
  })
  availableCopies: number;

  @Prop({
    type: Number,
    required: [true, 'Total copies count is required'],
    min: [1, 'There must be at least one copy'],
  })
  copies: number;

  @Prop({
    type: String,
    trim: true,
  })
  publisher: string;

  @Prop({
    type: String,
    trim: true,
    validate: {
      validator: (v: string) => /^https?:\/\/.+/.test(v),
      message: 'Invalid image URL format',
    },
  })
  imageURL: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
