import { BookGenre } from "../../../enums/Genre";
import { ServiceBookState } from "../../../enums/ServiceBookState";

export default interface IBookSearchRequest {
    searchString?: string;
    authorName?: string;
    userId?: string;
    title?: string;
    state?: ServiceBookState;
    genre?: BookGenre;
    skip?: number;
    take?: number;
}