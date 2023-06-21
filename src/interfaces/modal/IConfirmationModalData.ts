import ICommonModalData from "./ICommonModalData";

export default interface IConfirmationModalData<ContentStyle>
  extends ICommonModalData<ContentStyle> {
  confirmationData: {
    text: string;
    modalTitle: string;
    funcToCall?: Function;
    isAlert?: boolean;
  };
}
