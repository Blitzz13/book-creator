import { IMongoDocument } from "../IMongoDocument";
import IBaseChapter from "./IBaseChapter";

export default interface IServiceChapter extends IBaseChapter, IMongoDocument {
  header: string;
  content: string;
  orderId: number;
  bookId: string;
}
