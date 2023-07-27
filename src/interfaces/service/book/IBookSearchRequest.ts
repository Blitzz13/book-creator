export default interface IBookSearchRequest {
    searchString?: string;
    authorName?: string;
    title?: string;
    skip?: number;
    take?: number;
}