import BookService from "./services/BookService";

export class Services {
  private _bookService: BookService;

  constructor() {
    this._bookService = new BookService();
  }

  public get bookService(): BookService {
    return this._bookService;
  }
}
