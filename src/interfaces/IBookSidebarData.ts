import { IDisplayChapter } from "./IDisplayChapter";
import IHtmlElement from "./IHtmlElement";
import IBaseChapter from "./service/chapter/IBaseChapter";

export default interface IBookSidebarData extends IHtmlElement {
  data: {
    title: string;
    isFromModal: boolean;
    areSettingsOpen: boolean;
    setAreSettingsOpen: Function;
    saveChapter: Function;
    baseChapters: IBaseChapter[];
    currentChapter?: IDisplayChapter;
    updateCurrentChapter: Function;
    setOrderId: Function;
    deleteChapter: Function;
  };
}
