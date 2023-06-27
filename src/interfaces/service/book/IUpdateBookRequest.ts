import { ServiceBookState } from "../../../enums/ServiceBookState";

export interface IUpdateBookRequest {
  coverImage?: string;
  title?: string;
  genre?: string[];
  description?: string;
  state?: ServiceBookState;
  backCoverImage?: string;
}
