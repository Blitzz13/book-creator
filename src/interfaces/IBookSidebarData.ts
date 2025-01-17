import IDisplayBook from "./IDisplayBook";
import { IDisplayChapter } from "./IDisplayChapter";
import IHtmlElement from "./IHtmlElement";
import IBaseChapter from "./service/chapter/IBaseChapter";

export default interface IBookSidebarData extends IHtmlElement {
  data: {
    title: string;
    isFromModal: boolean;
    areSettingsOpen: boolean;
    saveChapter: Function;
    baseChapters: IBaseChapter[];
    book: IDisplayBook;
    updateBook: (book: IDisplayBook) => void;
    deleteConfirmation: (isDeletingChapter: boolean) => void;
    setPreviewOpen: (isOpen: boolean) => void;
    setDisplayBook: React.Dispatch<React.SetStateAction<IDisplayBook>>;
    saveBook: Function;
    setAreSettingsOpen: Function;
    updateCurrentChapter: Function;
    setOrderId: Function;
    showEditDescription: Function;
    onInviteListClick: Function;
    setShowLoader: Function;
    onChapterClick?: Function;
    setChapters?: Function;
    currentChapter?: IDisplayChapter;
    areChaptersLoading?: boolean;
  };
}
