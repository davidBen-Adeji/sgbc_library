import {
  IsString,
  IsNumber,
  IsInt,
  Min,
  MaxLength,
  IsEnum,
  IsOptional,
  IsUrl,
  IsNotEmpty,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  title: string;

  @IsNumber()
  @Min(1, { message: 'Price must be at least 1' })
  price: number;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  author: string;

  @IsEnum(['SGBC Library', 'GTS'], {
    message: "Collection must be either 'SGBC Library' or 'GTS'",
  })
  @Transform(({ value }) => value.trim())
  bookCollection: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  category: string;

  @IsString()
  @IsOptional()
  @MaxLength(1000, {
    message: 'Description cannot exceed 1000 characters',
  })
  @Transform(({ value }) => value.trim())
  description?: string;

  @IsInt()
  @Min(0, { message: 'Borrow times cannot be negative' })
  borrowTimes: number;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  ISBN: string;

  @IsInt()
  @Min(0, { message: 'Available copies cannot be negative' })
  availableCopies: number;

  @IsInt()
  @Min(1, { message: 'There must be at least one copy' })
  copies: number;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  publisher: string;

  @IsUrl({}, { message: 'Invalid image URL format' })
  @IsOptional()
  @Transform(({ value }) => value.trim())
  imageURL?: string;
}
