import IModalData from "./modal/IModalData";

export interface IAnimatedBook {
  modalData: IModalData;
  isExiting: boolean;
  setIsExiting: (isExiting: boolean) => void;
  frontCover?: string;
  backCover?: string;
  setToggle: (toggle: boolean) => void;
  toggle: boolean;
}
