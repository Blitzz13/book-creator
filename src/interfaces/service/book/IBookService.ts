import { IServiceBook } from "../book/IServiceBook";
import ICreateBookRequest from "./ICreateBookRequest";
import { IUpdateBookRequest } from "./IUpdateBookRequest";

export default interface IBookService {
  fetchBooks(): Promise<IServiceBook[]>;
  fetchBook(id: string): Promise<IServiceBook>;
  createBook(data: ICreateBookRequest): Promise<IServiceBook>;
  updateBook(id: string, data: IUpdateBookRequest): Promise<IServiceBook>;
  deleteBook(id: string): Promise<IServiceBook>;
}
