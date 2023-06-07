// import "reflect-metadata";
import { IBookService } from "../interfaces/service/book/IBookService";
import ICreateBookRequest from "../interfaces/service/book/ICreateBookRequest";
import { IServiceBook } from "../interfaces/service/book/IServiceBook";
import { IUpdateBookRequest } from "../interfaces/service/book/IUpdateBookRequest";
// import { injectable } from "inversify";

// @injectable()
export default class BookService implements IBookService {
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

  public async updateBook(data: IUpdateBookRequest): Promise<IServiceBook> {
    const response = await fetch(`${this._url}`, {
      method: "PATCH",
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
