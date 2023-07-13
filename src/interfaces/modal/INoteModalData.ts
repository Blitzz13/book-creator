import ICommonModalData from "./ICommonModalData";

export default interface INoteModalData<ContentStyle, OverlayStyle>
  extends ICommonModalData<ContentStyle, OverlayStyle> {
  descriptionData: {
    modalTitle: string;
    noteTitle: string;
    currentDescription: string;
    initialDescription: string;
    onSaveClick: Function;
    onDescriptionChange: Function;
    onNoteTitleChange: Function;
  };
}
