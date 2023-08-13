import IBaseChapter from "../interfaces/service/chapter/IBaseChapter";
import IChapterFetchCriteria from "../interfaces/service/chapter/IChapterFetchCriteria";
import IChapterService from "../interfaces/service/chapter/IChapterService";
import ICreateChapter from "../interfaces/service/chapter/ICreateChapter";
import IDeleteChapter from "../interfaces/service/chapter/IDeleteChapter";
import IServiceChapter from "../interfaces/service/chapter/IServiceChapter";
import IUpdateChapter from "../interfaces/service/chapter/IUpdateChapter";
import BaseService from "./BaseService";

export default class ChapterService extends BaseService implements IChapterService {
  private _url = "/api/chapters";

  public async fetchAllChapterTitles(bookId: string): Promise<IBaseChapter[]> {
    const response = await fetch(`${this._url}/chapter/chapter-titles/${bookId}`, {
      method: "GET",
    });

    const json = await response.json();

    if (response.ok) {
      return json;
    }

    throw new Error(`Fetching books failed with ${response.statusText}`);
  }

  public async fetchChapter(chapterId: string): Promise<IServiceChapter> {
    const response = await fetch(`${this._url}/${chapterId}`, {
      method: "GET",
    });

    const json = await response.json();

    if (response.ok) {
      return json;
    }

    throw new Error(`Fetching books failed with ${response.statusText}`);
  }

  public async fetchChapterByCriteria(data: IChapterFetchCriteria): Promise<IServiceChapter> {
    const response = await fetch(`${this._url}/by-criteria`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await response.json();

    if (response.ok) {
      return json;
    }

    throw new Error(`Fetching books failed with ${response.statusText}`);
  }

  public async createChapter(data: ICreateChapter): Promise<IServiceChapter> {
    const response = await fetch(`${this._url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.user?.token}`
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();

    if (response.ok) {
      return json;
    }

    throw new Error(`Fetching books failed with ${response.statusText}`);
  }

  public async updateChapter(data: IUpdateChapter): Promise<IServiceChapter> {
    const response = await fetch(`${this._url}/${data.chapterId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.user?.token}`
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();

    if (response.ok) {
      return json;
    }

    throw new Error(`Fetching books failed with ${response.statusText}`);
  }

  public async deleteChapter(data: IDeleteChapter): Promise<IServiceChapter> {
    const response = await fetch(`${this._url}/${data.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.user?.token}`
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();

    if (response.ok) {
      return json;
    }

    throw new Error(`Fetching books failed with ${response.statusText}`);
  }

  public async updateChaptersOrder(data: {
    bookId: string;
    orderId: number;
    chapterId: string;
  }): Promise<IServiceChapter> {
    const response = await fetch(`${this._url}/update-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.user?.token}`
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();

    if (response.ok) {
      return json;
    }

    throw new Error(`Fetching books failed with ${response.statusText}`);
  }
}
