import ICommonContentModalStyle from "./ICommonContentModalStyle";

export default interface INoBackgroundContentModalStyle
  extends ICommonContentModalStyle {
  disableMaxWidthHeightQuery?: boolean;
  maxHeight?: string;
  isExiting?: boolean;
}
