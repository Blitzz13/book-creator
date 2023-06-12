import { StyledComponent } from "styled-components";

export default interface ICommonModalData<ContentStyle> {
    data: {
        setOpen: (toggle: boolean) => void;
        setExiting: (toggle: boolean) => void;
        isOpen: boolean;
        isExiting: boolean;
        height?: number;
        ContentElement: StyledComponent<"div", any, any, never>;
        contentData: ContentStyle;
    };
    children: React.ReactNode;
}
