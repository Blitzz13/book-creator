// import "reflect-metadata";
import IAddToFavouritesRequest from "../interfaces/service/book/IAddToFavouritesRequest";
import IBookSearchRequest from "../interfaces/service/book/IBookSearchRequest";
import IBookService from "../interfaces/service/book/IBookService";
import ICreateBookRequest from "../interfaces/service/book/ICreateBookRequest";
import IFavouriteBookResult from "../interfaces/service/book/IFavouriteBookResult";
import ISearchCountResult from "../interfaces/service/book/ISearchCountResult";
import { IServiceBook } from "../interfaces/service/book/IServiceBook";
import { IUpdateBookRequest } from "../interfaces/service/book/IUpdateBookRequest";
// import { injectable } from "inversify";

// @injectable()
export default class BookService implements IBookService {
  public async searchBooks(
    request: IBookSearchRequest
  ): Promise<IServiceBook[]> {
    const response = await fetch(`${this._url}/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });

    const json = await response.json();

    if (response.ok) {
      return json;
    }

    throw new Error(`Creating book failed with ${response.statusText}`);
  }

  public async addToFavourites(
    request: IAddToFavouritesRequest
  ): Promise<void> {
    const response = await fetch(`${this._url}/favourites`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });

    const json = await response.json();

    if (response.ok) {
      return json;
    }

    throw new Error(
      `Adding book to favourtites failed with ${response.statusText}`
    );
  }

  public async getFavouriteBooks(userId: string): Promise<IFavouriteBookResult> {
    const response = await fetch(`${this._url}/favourites/${userId}`, {
      method: "GET",
    });

    const json = await response.json();

    if (response.ok) {
      return json;
    }

    throw new Error(
      `Retrieving favourite books failed with ${response.statusText}`
    );
  }

  public async getSearchBooksCount(
    request: IBookSearchRequest
  ): Promise<ISearchCountResult> {
    const response = await fetch(`${this._url}/search/count`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });

    const json = await response.json();

    if (response.ok) {
      return json;
    }

    throw new Error(`Creating book failed with ${response.statusText}`);
  }
  private _url = "/api/books";

  public async fetchBooks(): Promise<IServiceBook[]> {
    const response = await fetch(this._url, {
      method: "GET",
    });
    const json = await response.json();

    if (response.ok) {
      return json;
    }

    throw new Error(`Fetching books failed with ${response.statusText}`);
  }

  public async fetchBook(id: string): Promise<IServiceBook> {
    const response = await fetch(`${this._url}/${id}`, {
      method: "GET",
    });
    const json = await response.json();

    if (response.ok) {
      return json;
    }

    throw new Error(`Fetching book failed with ${response.statusText}`);
  }

  public async createBook(data: ICreateBookRequest): Promise<IServiceBook> {
    const response = await fetch(`${this._url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await response.json();

    if (response.ok) {
      return json;
    }

    throw new Error(`Creating book failed with ${response.statusText}`);
  }

  public async updateBook(
    id: string,
    data: IUpdateBookRequest
  ): Promise<IServiceBook> {
    const response = await fetch(`${this._url}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await response.json();

    if (response.ok) {
      return json;
    }

    throw new Error(`Updating book failed with ${response.statusText}`);
  }

  public async deleteBook(id: string): Promise<IServiceBook> {
    const response = await fetch(`${this._url}/${id}`, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      return json;
    }

    throw new Error(`Fetching book failed with ${response.statusText}`);
  }
}
