import { ServiceBookState } from "../../../enums/ServiceBookState";
import { IMongoDocument } from "../IMongoDocument";

export interface IServiceBook extends IMongoDocument {
  coverImage?: string;
  title: string;
  genre: string[];
  description: string;
  state: ServiceBookState;
  author: string;
  authorId: string;
  rating: number;
  backCoverImage?: string;
}
