export interface IUpdateBookRequest {
  coverImage: string;
  title: string;
  genre: string[];
  description: string;
  state: string;
  backCoverImage?: string;
}
