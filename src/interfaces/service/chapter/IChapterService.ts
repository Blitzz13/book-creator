import IBaseChapter from "./IBaseChapter";
import IChapterFetchCriteria from "./IChapterFetchCriteria";
import ICreateChapter from "./ICreateChapter";
import IDeleteChapter from "./IDeleteChapter";
import IServiceChapter from "./IServiceChapter";
import IUpdateChapter from "./IUpdateChapter";

export default interface IChapterService {
  fetchAllChapterTitles(bookId: string): Promise<IBaseChapter[]>;
  fetchChapter(chapterId: string): Promise<IServiceChapter>;
  updateChapter(data: IUpdateChapter): Promise<IServiceChapter>;
  deleteChapter(data: IDeleteChapter): Promise<IServiceChapter | null>;
  updateChaptersOrder(data: {
    bookId: string;
    orderId: number;
    chapterId: string;
  }): Promise<IBaseChapter>;
  createChapter(data: ICreateChapter): Promise<IServiceChapter>;
  fetchChapterByCriteria(data: IChapterFetchCriteria): Promise<IServiceChapter> 
}
