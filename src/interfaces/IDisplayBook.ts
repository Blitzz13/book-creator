import { BookState } from "../enums/BookState";

export default interface IDisplayBook {
  id: string;
  title: string;
  frontConver?: string;
  backCover?: string;
  state: BookState;
  description: string;
}
