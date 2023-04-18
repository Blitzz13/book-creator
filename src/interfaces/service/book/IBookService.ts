import { IServiceBook } from "../book/IServiceBook";
import { IUpdateBookRequest } from "./IUpdateBookRequest";

export interface IBookService {
  fetchBooks(): Promise<IServiceBook[]>;
  fetchBook(id: string): Promise<IServiceBook>;
  createBook(id: IServiceBook): Promise<IServiceBook>;
  updateBook(data: IUpdateBookRequest): Promise<IServiceBook>;
  deleteBook(id: string): Promise<IServiceBook>;
}
