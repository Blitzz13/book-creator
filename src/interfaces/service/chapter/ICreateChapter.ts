import { ServiceChapterState } from "../../../enums/ServiceChapterState";

export default interface ICreateChapter {
  header: string;
  content: string;
  orderId: string;
  bookId: string;
  state: ServiceChapterState;
}
