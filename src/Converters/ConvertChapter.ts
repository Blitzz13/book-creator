import { IDisplayChapter } from "../interfaces/IDisplayChapter";
import ICreateChapter from "../interfaces/service/chapter/ICreateChapter";
import IServiceChapter from "../interfaces/service/chapter/IServiceChapter";
import IUpdateChapter from "../interfaces/service/chapter/IUpdateChapter";
import {
  ChapterStateServiceToState,
  ChapterStateToService,
} from "./ConvertChapterState";

export function ServiceToChapter(chapter: IServiceChapter): IDisplayChapter {
  return {
    id: chapter._id,
    content: chapter.content,
    header: chapter.header,
    orderId: chapter.orderId,
    state: ChapterStateServiceToState(chapter.state),
    bookId: chapter.bookId,
  };
}

export function ChapterToUpdate(chapter: IDisplayChapter): IUpdateChapter {
  if (!chapter.id) {
    throw new Error("Chapter id is missing");
  }
  
  return {
    chapterId: chapter.id,
    content: chapter.content,
    header: chapter.header,
    orderId: chapter.orderId.toString(),
    state: ChapterStateToService(chapter.state),
  };
}

export function ChapterToCreate(chapter: IDisplayChapter): ICreateChapter {
  return {
    content: chapter.content,
    header: chapter.header,
    orderId: chapter.orderId.toString(),
    state: ChapterStateToService(chapter.state),
    bookId: chapter.bookId,
  };
}
