import { BookState } from "../enums/BookState";
import { BookGenre } from "../enums/Genre";

export default interface IDisplayBook {
  id: string;
  title: string;
  frontConver?: string;
  frontConverPercent?: number;
  backCover?: string;
  backCoverPercent?: number;
  state: BookState;
  description: string;
  genres: BookGenre[];
}
