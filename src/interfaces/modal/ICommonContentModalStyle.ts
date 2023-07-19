export default interface ICommonContentModalStyle {
  width: string;
  border?: {
    topLeft?: string;
    topRight?: string;
    bottomLeft?: string;
    bottomRight?: string;
  };
  height?: string | number;
  maxScreenHeight?: number;
  overflow?: string;
  overflowY?: string;
  backgroundColor?: string;
}
