import { IMongoDocument } from "../IMongoDocument";

export interface IServiceBook extends IMongoDocument {
  coverImage: string;
  title: string;
  genre: string[];
  description: string;
  state: string;
  author: string;
  rating: number;
  backCoverImage?: string;
}
