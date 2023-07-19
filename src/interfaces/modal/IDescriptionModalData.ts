import ICommonModalData from "./ICommonModalData";

export default interface IDescriptionModalData<ContentStyle, OverlayStyle>
  extends ICommonModalData<ContentStyle, OverlayStyle> {
  descriptionData: {
    modalTitle: string;
    initialDescription: string;
    funcToCall: Function;
    onDescriptionChange: Function;
  };
}
