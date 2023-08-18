import IHtmlElement from "./IHtmlElement";
import IBaseChapter from "./service/chapter/IBaseChapter";

export default interface IChapterContentData extends IHtmlElement {
  data: {
    isLoading: boolean;
    baseChapters: IBaseChapter[];
    isInWritingMode: boolean;
    setOrderId?: Function;
    onChapterClick?: Function;
    currentChapterId?: string;
  };
}
