import { ChapterState } from "../../../enums/ChapterState";

export default interface IBaseChapter {
  header: string;
  state: ChapterState;
  orderId: number;
  _id: string;
}
