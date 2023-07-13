import ICommonModalData from "./ICommonModalData";

export default interface IConfirmationModalData<ContentStyle, OverlayStyle>
  extends ICommonModalData<ContentStyle, OverlayStyle> {
  confirmationData: {
    text: string;
    modalTitle: string;
    funcToCall?: Function;
    isAlert?: boolean;
  };
}
