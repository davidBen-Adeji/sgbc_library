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
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
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

  @Get('category/:category')
  findByCategory(
    @Param('category') category: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.booksService.findByCategory(category, page);
  }

  @Get('authors')
  findAllAuthors() {
    return this.booksService.findAllAuthors();
  }

  @Get('author/:author')
  findByAuthor(
    @Param('author') author: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.booksService.findByAuthor(author, page);
  }

  @Get(':id')
  findOneBook(@Param('id') id: string) {
    return this.booksService.findOneBook(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
