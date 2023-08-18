import { BookGenre } from "../../../enums/Genre";
import { ServiceBookState } from "../../../enums/ServiceBookState";

export interface IUpdateBookRequest {
  coverImage?: string;
  title?: string;
  genre?: BookGenre[];
  description?: string;
  userIds?: string[];
  state?: ServiceBookState;
  backCoverImage?: string;
}
