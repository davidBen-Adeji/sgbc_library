import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
// import type { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createBook(
    @UploadedFile() file: Express.Multer.File,
    @Body() createBookDto: CreateBookDto,
  ) {
    console.log('File name: ', file);
    // const uploadedImage = await this.cloudinaryService.uploadImage(file.path);
    //
    // fs.unlinkSync(file.path);
    //
    // return this.booksService.createBook({
    //   ...createBookDto,
    //   imageURL: uploadedImage.secure_url,
    //   cloudinaryId: uploadedImage.public_id,
    // });
  }

  @Get()
  findAllBooks(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.booksService.findAllBooks(page);
  }

  @Get('sgbc')
  findSgbcBooks(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.booksService.findSgbcBooks(page);
  }

  @Get('gts')
  findGtsBooks(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.booksService.findGtsBooks(page);
  }

  @Get('popular')
  findMostBorrowed(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.booksService.findMostBorrowed(page);
  }

  @Get('search')
  searchBooks(
    @Query('query') query: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.booksService.searchBooks(query, page);
  }

  @Get('quick-search')
  quickBookSearch(@Query('query') query: string) {
    return this.booksService.quickBookSearch(query);
  }

  @Get('categories/:category')
  findByCategory(
    @Param('category') category: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(0), ParseIntPipe) limit: number,
  ) {
    return this.booksService.findByCategory(category, page, limit);
  }

  @Get('authors')
  findAllAuthors() {
    return this.booksService.findAllAuthors();
  }

  @Get('authors/:author')
  findByAuthor(
    @Param('author') author: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(0), ParseIntPipe) limit: number,
  ) {
    return this.booksService.findByAuthor(author, page, limit);
  }

  @Get(':id')
  findOneBook(@Param('id') id: string) {
    return this.booksService.findOneBook(id);
  }

  @Patch(':id')
  updateBook(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.updateBook(id, updateBookDto);
  }

  @Delete(':id')
  deleteBook(@Param('id') id: string) {
    return this.booksService.deleteBook(id);
  }
}
