import { ToolbarEmbed } from "../enums/ToolbarEmbed";
import { ToolbarQuoteStyle } from "../enums/ToolbarQuoteStyle";
import { ToolbarTextAlign } from "../enums/ToolbarTextAlign";
import { ToolbarTextSizes } from "../enums/ToolbarTextSizes";
import { ToolbarTextStyle } from "../enums/ToolbarTextStyle";
import IHtmlElement from "./IHtmlElement";

export default interface IEditorData extends IHtmlElement {
  data: {
    onValueChange?: Function;
    setData?: string;
    modules?: {
      toolbar?: {
        textStyles?: ToolbarTextStyle[];
        quoteStyles?: ToolbarQuoteStyle[];
        liststyles?: { list: string }[];
        indentStyle?: { indent: string }[];
        scriptStyles?: { script: string }[];
        direction?: { direction: string };
        sizes?: [{ size: ToolbarTextSizes[] }];
        headerSizes?: [{ header: number[] }];
        embeded?: ToolbarEmbed[];
        colorStyles?: { [key: string]: [] | [string] }[];
        fonts?: [{ font: [] | [string] }];
        align?: [{ align: [] | ToolbarTextAlign[] }];
        removeStylesButton?: ["clean"];
      };
    };
  };
}

// example config
// textStyles: [ToolbarTextStyle.BOLD],
// sizes: [{ size: [ToolbarTextSizes.normal, ToolbarTextSizes.huge] }],
// liststyles: [ORDERED_LIST],
// headerSizes: [{ header: [1, 2] }],
// colorStyles: [{ color: []}, {background: []}],
// fonts: [{font: []}],
// align: [{align: []}],
