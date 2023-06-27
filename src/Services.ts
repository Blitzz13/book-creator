import IBookService from "./interfaces/service/book/IBookService";
import IChapterService from "./interfaces/service/chapter/IChapterService";
import IUserService from "./interfaces/service/user/IUserService";
import BookService from "./services/BookService";
import ChapterService from "./services/ChapterService";
import UserService from "./services/UserService";

export class Services {
  private _bookService: IBookService;
  private _userService: IUserService;
  private _chapterService: IChapterService;

  constructor() {
    this._bookService = new BookService();
    this._userService = new UserService();
    this._chapterService = new ChapterService();
  }

  public get bookService(): IBookService {
    return this._bookService;
  }

  public get userService(): IUserService {
    return this._userService;
  }

  public get chapterService(): IChapterService {
    return this._chapterService;
  }
}
