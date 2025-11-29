import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  //limit: maximum number of books to send per request
  private readonly limit = 28;

  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async createBook(dto: CreateBookDto) {
    try {
      await this.bookModel.create(dto);

      return {
        success: true,
        code: 201,
        message: 'Book created successfully',
      };
    } catch (err) {
      console.error('Error creating book:', err);
      throw new InternalServerErrorException('Failed to create book');
    }
  }

  async findAllBooks(page: number) {
    if (page < 1) {
      throw new BadRequestException('Page number must be 1 or greater');
    }
    const skip = (page - 1) * this.limit;

    try {
      const books = await this.bookModel
        .find()
        .skip(skip)
        .limit(this.limit)
        .sort({ createdAt: -1 });

      const totalBooks = await this.bookModel.countDocuments();
      const totalPages = Math.ceil(totalBooks / this.limit);

      return { books, totalPages };
    } catch (err) {
      console.error('Error fetching books:', err);
      throw new InternalServerErrorException('Failed to fetch books');
    }
  }

  async findSgbcBooks(page: number) {
    if (page < 1) {
      throw new BadRequestException('Page number must be 1 or greater');
    }
    const skip = (page - 1) * this.limit;

    try {
      const books = await this.bookModel
        .find({ bookCollection: 'SGBC' })
        .skip(skip)
        .limit(this.limit)
        .sort({ createdAt: -1 });

      const totalBooks = await this.bookModel.countDocuments({
        bookCollection: 'SGBC',
      });
      const totalPages = Math.ceil(totalBooks / this.limit);

      return { books, totalPages };
    } catch (err) {
      console.error('Error fetching books:', err);
      throw new InternalServerErrorException('Failed to fetch books');
    }
  }

  async findGtsBooks(page: number) {
    if (page < 1) {
      throw new BadRequestException('Page number must be 1 or greater');
    }
    const skip = (page - 1) * this.limit;

    try {
      const books = await this.bookModel
        .find({ bookCollection: 'GTS' })
        .skip(skip)
        .limit(this.limit)
        .sort({ createdAt: -1 });

      const totalBooks = await this.bookModel.countDocuments({
        bookCollection: 'GTS',
      });
      const totalPages = Math.ceil(totalBooks / this.limit);

      return { books, totalPages };
    } catch (err) {
      console.error('Error fetching books:', err);
      throw new InternalServerErrorException('Failed to fetch books');
    }
  }

  async findMostBorrowed(page: number) {
    if (page < 1) {
      throw new BadRequestException('Page number must be 1 or greater');
    }
    const skip = (page - 1) * this.limit;

    try {
      const books = await this.bookModel
        .find()
        .skip(skip)
        .limit(this.limit)
        .sort({ borrowTimes: -1 });

      const totalBooks = await this.bookModel.countDocuments();
      const totalPages = Math.ceil(totalBooks / this.limit);

      return { books, totalPages };
    } catch (err) {
      console.error('Error fetching books:', err);
      throw new InternalServerErrorException('Failed to fetch books');
    }
  }

  async findOneBook(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`${id} is not a valid id`);
    }

    try {
      const book = await this.bookModel.findById(id).exec();
      if (!book) {
        throw new NotFoundException(`Book with id ${id} not found`);
      }
      return book;
    } catch (err) {
      console.error('Error fetching book:', err);
      throw new InternalServerErrorException('Failed to fetch book');
    }
  }

  async searchBooks(query: string, page: number) {
    if (!query) {
      throw new BadRequestException('Search query is required');
    }
    if (page < 1) {
      throw new BadRequestException('Page number must be 1 or greater');
    }

    const skip = (page - 1) * this.limit;

    const regex = new RegExp(query, 'i'); // case-insensitive

    try {
      const books = await this.bookModel
        .find({
          $or: [
            { title: { $regex: regex } },
            { author: { $regex: regex } },
            { ISBN: { $regex: regex } },
          ],
        })
        .skip(skip)
        .limit(this.limit);

      const totalBooks = await this.bookModel.countDocuments({
        $or: [
          { title: { $regex: regex } },
          { author: { $regex: regex } },
          { ISBN: { $regex: regex } },
        ],
      });
      const totalPages = Math.ceil(totalBooks / this.limit);

      return { books, totalPages };
    } catch (err) {
      console.error('Error fetching books:', err);
      throw new InternalServerErrorException('Failed to fetch books');
    }
  }

  async quickBookSearch(query: string) {
    if (!query) {
      throw new BadRequestException('Search query is required');
    }

    const regex = new RegExp(query, 'i'); // case-insensitive

    try {
      const books = await this.bookModel
        .find({
          $or: [
            { title: { $regex: regex } },
            { author: { $regex: regex } },
            { ISBN: { $regex: regex } },
          ],
        })
        .limit(10);

      return books;
    } catch (err) {
      console.error('Error fetching books:', err);
      throw new InternalServerErrorException('Failed to fetch books');
    }
  }

  async findByCategory(category: string, page: number, limit: string) {
    if (!category) {
      throw new BadRequestException('Category is required');
    }
    if (page < 1) {
      throw new BadRequestException('Page number must be 1 or greater');
    }

    const skip = (page - 1) * this.limit;

    function escapeRegex(str: string) {
      return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    const regex = new RegExp(escapeRegex(category), 'i'); // case-insensitive

    try {
      if (limit && limit === '4') {
        return this.bookModel.aggregate([
          { $match: { category: { $regex: regex } } },
          { $sample: { size: 4 } },
        ]);
      }

      const books = await this.bookModel
        .find({ category: { $regex: regex } })
        .skip(skip)
        .limit(this.limit)
        .sort({ createdAt: -1 });

      if (!books || books.length === 0) {
        throw new NotFoundException(`No books found in category; ${category}`);
      }

      const totalBooks = await this.bookModel.countDocuments({
        category: { $regex: regex },
      });
      const totalPages = Math.ceil(totalBooks / this.limit);

      return { books, totalPages };
    } catch (err) {
      console.error('Error fetching books:', err);
      throw new InternalServerErrorException('Failed to fetch books');
    }
  }

  async findAllAuthors() {
    try {
      const authors = await this.bookModel.distinct('author');

      return authors;
    } catch (err) {
      console.error('Error fetching authors', err);
      throw new InternalServerErrorException('Failed to fetch authors');
    }
  }

  async findByAuthor(author: string, page: number, limit: string) {
    if (!author) {
      throw new BadRequestException('Author is required');
    }
    if (page < 1) {
      throw new BadRequestException('Page number must be 1 or greater');
    }

    const skip = (page - 1) * this.limit;

    const regex = new RegExp(author, 'i'); // case-insensitive

    try {
      if (limit && limit === '4') {
        return this.bookModel.aggregate([
          { $match: { author: { $regex: regex } } },
          { $sample: { size: 4 } },
        ]);
      }

      const books = await this.bookModel
        .find({ author: { $regex: regex } })
        .skip(skip)
        .limit(this.limit)
        .sort({ createdAt: -1 });

      if (!books || books.length === 0) {
        throw new NotFoundException(`No books found authored by ${author}`);
      }

      const totalBooks = await this.bookModel.countDocuments({
        author: { $regex: regex },
      });
      const totalPages = Math.ceil(totalBooks / this.limit);

      return { books, totalPages };
    } catch (err) {
      console.error('Error fetching books:', err);
      throw new InternalServerErrorException('Failed to fetch books');
    }
  }

  async updateBook(id: string, updateBookDto: UpdateBookDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`${id} is not a valid id`);
    }

    try {
      const updatedBook = await this.bookModel.findByIdAndUpdate(
        id,
        { $set: updateBookDto },
        { new: true },
      );

      if (!updatedBook) {
        throw new NotFoundException(`Book with ID ${id} not found`);
      }

      return {
        success: true,
        code: 200,
        message: 'Book updated successfully',
      };
    } catch (err) {
      console.error('Error updating book:', err);
      throw new InternalServerErrorException('Failed to update book');
    }
  }

  async deleteBook(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`${id} is not a valid id`);
    }

    try {
      const deletedBook = await this.bookModel.findByIdAndDelete(id);

      if (!deletedBook) {
        throw new NotFoundException(`Book with ID ${id} not found`);
      }

      return {
        success: true,
        code: 200,
        message: 'Book deleted successfully',
      };
    } catch (err) {
      console.error('Error deleting books:', err);
      throw new InternalServerErrorException('Failed to delete book');
    }
  }
}
