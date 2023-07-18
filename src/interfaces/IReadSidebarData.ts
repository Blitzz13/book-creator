import IHtmlElement from "./IHtmlElement";
import IBaseChapter from "./service/chapter/IBaseChapter";
import { IBaseNote } from "./service/note/IBaseNote";

export default interface IReadSidebarData extends IHtmlElement {
  data: {
    baseChapters: IBaseChapter[];
    baseNotes: IBaseNote[];
    isInWritingMode: boolean;
    currentChapterId: string;
    isFromModal: boolean;
    areChaptersSelected: boolean;
    setChaptersSelected: (areSelected: boolean) => void;
    onChapterClick?: Function;
    onNoteClick?: Function;
    onNoteEditClick?: Function;
    onNoteDeleteClick?: Function;
  };
}
