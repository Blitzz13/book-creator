import IBookService from "./service/book/IBookService";
import IChapterService from "./service/chapter/IChapterService";

export default interface IWriteBookData {
    bookService: IBookService;
    chapterService: IChapterService;
}
