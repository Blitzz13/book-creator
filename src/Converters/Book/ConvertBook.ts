import IDisplayBook from "../../interfaces/IDisplayBook";
import { IServiceBook } from "../../interfaces/service/book/IServiceBook";
import { IUpdateBookRequest } from "../../interfaces/service/book/IUpdateBookRequest";
import { BookStateServiceToState, BookStateToService } from "./ConvertBookState";

export function ServiceToBook(book: IServiceBook): IDisplayBook {
  return {
    id: book._id,
    description: book.description,
    state: BookStateServiceToState(book.state),
    title: book.title,
    backCover: book.backCoverImage,
    frontConver: book.coverImage,
    genres: book.genre,
  };
}

export function BookToUpdate(book: IDisplayBook): IUpdateBookRequest {
  return {
    description: book.description,
    state: BookStateToService(book.state),
    title: book.title,
    genre: book.genres,
    backCoverImage: book.backCover,
    coverImage: book.frontConver,
  };
}
