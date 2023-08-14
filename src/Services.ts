import IBookService from "./interfaces/service/book/IBookService";
import IChapterService from "./interfaces/service/chapter/IChapterService";
import INoteService from "./interfaces/service/note/INoteService";
import IRatingService from "./interfaces/service/rating/IRatingService";
import IUserService from "./interfaces/service/user/IUserService";
import BookService from "./services/BookService";
import ChapterService from "./services/ChapterService";
import NoteService from "./services/NoteService";
import RatingService from "./services/RatingService";
import UserService from "./services/UserService";

export default class Services {
  private _bookService: IBookService;
  private _userService: IUserService;
  private _chapterService: IChapterService;
  private _noteService: INoteService;
  private _ratingService: IRatingService;

  constructor() {
    this._bookService = new BookService();
    this._userService = new UserService();
    this._chapterService = new ChapterService();
    this._noteService = new NoteService();
    this._ratingService = new RatingService();
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

  public get noteService(): INoteService {
    return this._noteService;
  }

  public get ratingService(): IRatingService {
    return this._ratingService;
  }
}
