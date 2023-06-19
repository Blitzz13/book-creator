import IBaseChapter from "../interfaces/service/chapter/IBaseChapter";
import IChapterService from "../interfaces/service/chapter/IChapterService";
import IServiceChapter from "../interfaces/service/chapter/IServiceChapter";
import IUpdateChapter from "../interfaces/service/chapter/IUpdateChapter";

export default class ChapterService implements IChapterService {
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

  public async createChapter(data: {
    header: string;
    content: string;
    orderId?: number;
    bookId: string;
  }): Promise<IServiceChapter> {
    const response = await fetch(`${this._url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!data.orderId) {
      data.orderId = 0;
    }

    const json = await response.json();

    if (response.ok) {
      return json;
    }

    throw new Error(`Fetching books failed with ${response.statusText}`);
  }

  public async updateChapter(data: IUpdateChapter): Promise<IServiceChapter> {
    const response = await fetch(`${this._url}/${data.chapterId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await response.json();

    if (response.ok) {
      return json;
    }

    throw new Error(`Fetching books failed with ${response.statusText}`);
  }

  public async updateChaptersOrder(data:  {
    bookId: string;
    orderId: number;
    chapterId: string;
  }): Promise<IServiceChapter> {
    const response = await fetch(`${this._url}/update-order`, {
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
}
