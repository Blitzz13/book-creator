import { IServiceBook } from "../book/IServiceBook";
import ICreateBookRequest from "./ICreateBookRequest";
import { IUpdateBookRequest } from "./IUpdateBookRequest";

export interface IBookService {
  fetchBooks(): Promise<IServiceBook[]>;
  fetchBook(id: string): Promise<IServiceBook>;
  createBook(id: ICreateBookRequest): Promise<IServiceBook>;
  updateBook(data: IUpdateBookRequest): Promise<IServiceBook>;
  deleteBook(id: string): Promise<IServiceBook>;
}
