import { ServiceChapterState } from "../../../enums/ServiceChapterState";

export default interface IUpdateChapter {
  chapterId: string;
  orderId?: string;
  header?: string;
  content?: string;
  state?: ServiceChapterState;
}
