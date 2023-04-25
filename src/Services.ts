import BookService from "./services/BookService";
import UserService from "./services/UserService";

export class Services {
  private _bookService: BookService;
  private _userService: UserService;

  constructor() {
    this._bookService = new BookService();
    this._userService = new UserService();
  }

  public get bookService(): BookService {
    return this._bookService;
  }

  public get userService(): UserService {
    return this._userService;
  }
}
