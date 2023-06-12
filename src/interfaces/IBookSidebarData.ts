import IHtmlElement from "./IHtmlElement";

export default interface IBookSidebarData extends IHtmlElement {
  data: {
    title: string;
    isFromModal: boolean;
  };
}
