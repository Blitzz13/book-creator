import { StyledComponent } from "styled-components";

export default interface ICommonModalData<ContentStyle, OverlayStyle> {
  data: {
    setOpen: (toggle: boolean) => void;
    setExiting: (toggle: boolean) => void;
    isOpen: boolean;
    isExiting: boolean;
    ContentElement: StyledComponent<"div", any, any, never>;
    contentData: ContentStyle;
    OverlayElement?: StyledComponent<"div", any, any, never>;
    overlayData?: OverlayStyle;
    willPlayCloseAnimation?: boolean;
    height?: number;
    onAfterOpen?: Function;
  };
  id?: string;
  children: React.ReactNode;
}
