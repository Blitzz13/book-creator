import { BookGenre } from "../../../enums/Genre";

export default interface IBookSearchRequest {
    searchString?: string;
    authorName?: string;
    userId?: string;
    title?: string;
    genre?: BookGenre;
    skip?: number;
    take?: number;
}