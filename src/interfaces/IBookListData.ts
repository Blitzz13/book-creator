import IHtmlElement from "./IHtmlElement";
import { IServiceBook } from "./service/book/IServiceBook";

export default interface IBookListData extends IHtmlElement {
  data: {
    books: IServiceBook[];
    favouriteBooksIds: string[];
    onReadClick?: Function;
    addToFavourites: (bookId: string) => void;
    onClick?: Function;
    verticalScroll?: boolean;
    scaleBook?: boolean;
  };
}
