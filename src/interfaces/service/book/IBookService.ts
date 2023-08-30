import { IServiceBook } from "../book/IServiceBook";
import IAddToFavouritesRequest from "./IAddToFavouritesRequest";
import IBookSearchRequest from "./IBookSearchRequest";
import ICreateBookRequest from "./ICreateBookRequest";
import IFavouriteBookIdsResult from "./IFavouriteBookIdsResult";
import ISearchCountResult from "./ISearchCountResult";
import { IUpdateBookRequest } from "./IUpdateBookRequest";

export default interface IBookService {
  fetchBooks(): Promise<IServiceBook[]>;
  addToFavourites(request: IAddToFavouritesRequest): Promise<void>;
  getFavouriteBooksIds(userId: string): Promise<IFavouriteBookIdsResult>;
  getFavouriteBooks(userId: string): Promise<IServiceBook[]>;
  searchBooks(request: IBookSearchRequest): Promise<IServiceBook[]>;
  getSearchBooksCount(request: IBookSearchRequest): Promise<ISearchCountResult>;
  fetchBook(id: string): Promise<IServiceBook>;
  createBook(data: ICreateBookRequest): Promise<IServiceBook>;
  updateBook(id: string, data: IUpdateBookRequest): Promise<IServiceBook>;
  deleteBook(id: string): Promise<IServiceBook>;
  download(id: string): Promise<Buffer>;
  upload(bookId: string, file: Buffer): Promise<{title: string, content: string}>;
}
