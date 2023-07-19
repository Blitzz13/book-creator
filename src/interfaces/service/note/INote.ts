import IBaseChapter from "../chapter/IBaseChapter";

export interface INote extends IBaseChapter {
    content: string,
    bookId: string,
}
