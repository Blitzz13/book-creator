import { ChapterState } from "../enums/ChapterState";

export interface IDisplayChapter {
  id?: string;
  bookId: string;
  content: string;
  header: string;
  orderId: number;
  state: ChapterState;
}
