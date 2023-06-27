import IBookService from "../service/book/IBookService";
import IModalData from "./IModalData";

export default interface ICreateBookModalData extends IModalData {
  width: string;
  bookService: IBookService;
}
