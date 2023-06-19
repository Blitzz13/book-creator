import IBaseChapter from "./IBaseChapter";
import IServiceChapter from "./IServiceChapter";
import IUpdateChapter from "./IUpdateChapter";

export default interface IChapterService {
  fetchAllChapterTitles(bookId: string): Promise<IBaseChapter[]>;
  fetchChapter(chapterId: string): Promise<IServiceChapter>;
  updateChapter(data: IUpdateChapter): Promise<IServiceChapter>;
  updateChaptersOrder(data: {
    bookId: string;
    orderId: number;
    chapterId: string;
  }): Promise<IBaseChapter>;
  createChapter(data: {
    header: string;
    content: string;
    orderId?: number;
    bookId: string;
  }): Promise<IServiceChapter>;
}
