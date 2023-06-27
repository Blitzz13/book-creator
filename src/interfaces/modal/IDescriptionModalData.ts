import ICommonModalData from "./ICommonModalData";

export default interface IDescriptionModalData<ContentStyle>
  extends ICommonModalData<ContentStyle> {
  descriptionData: {
    modalTitle: string;
    initialDescription: string;
    funcToCall: Function;
    onDescriptionChange: Function;
  };
}
