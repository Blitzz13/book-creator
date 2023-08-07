export default interface IBookSearchRequest {
    searchString?: string;
    authorName?: string;
    userId?: string;
    title?: string;
    skip?: number;
    take?: number;
}