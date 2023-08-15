import { BookGenre } from "../../../enums/Genre";
import { ServiceBookState } from "../../../enums/ServiceBookState";
import { IMongoDocument } from "../IMongoDocument";

export interface IServiceBook extends IMongoDocument {
  coverImage?: string;
  title: string;
  genre: BookGenre[];
  description: string;
  state: ServiceBookState;
  author: string;
  authorId: string;
  rating: number;
  backCoverImage?: string;
}
