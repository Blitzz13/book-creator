import { ServiceChapterState } from "../../../enums/ServiceChapterState";

export default interface IBaseChapter {
  header: string;
  state: ServiceChapterState;
  orderId: number;
  _id: string;
}
