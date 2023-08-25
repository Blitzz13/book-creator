import IHtmlElement from "./IHtmlElement";
import { IServiceBook } from "./service/book/IServiceBook";

export default interface IBookListData extends IHtmlElement {
  data: {
    books: IServiceBook[];
    favouriteBooksIds: string[];
    noBooksMessage?: string;
    onReadClick?: Function;
    onDeleteClick?: Function;
    addToFavourites: (bookId: string) => void;
    onClick?: Function;
    verticalScroll?: boolean;
    scaleBook?: boolean;
    starsInteractive?: boolean;
    mediaMaxWidth?: number;
    align?: string;
  };
}
