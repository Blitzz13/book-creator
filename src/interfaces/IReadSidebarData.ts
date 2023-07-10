import IHtmlElement from "./IHtmlElement";
import IBaseChapter from "./service/chapter/IBaseChapter";

export default interface IReadSidebarData extends IHtmlElement {
  data: {
    baseChapters: IBaseChapter[];
    isInWritingMode: boolean;
    currentChapterId: string;
    isFromModal: boolean;
    areChaptersSelected: boolean;
    setChaptersSelected: (areSelected: boolean) => void;
    onChapterClick?: Function;
  };
}
