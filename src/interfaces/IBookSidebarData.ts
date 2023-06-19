import IHtmlElement from "./IHtmlElement";
import IBaseChapter from "./service/chapter/IBaseChapter";
import IServiceChapter from "./service/chapter/IServiceChapter";

export default interface IBookSidebarData extends IHtmlElement {
  data: {
    title: string;
    isFromModal: boolean;
    areSettingsOpen: boolean;
    setAreSettingsOpen: Function;
    saveChapter: Function;
    baseChapters: IBaseChapter[];
    currentChapter?: IServiceChapter;
    updateCurrentChapter: Function;
    setOrderId: Function;
  };
}
