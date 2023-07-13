export default interface INoteModalModel{
  modalTitle: string;
  noteTitle: string;
  initialDescription: string;
  currentDescription: string;
  isOpen: boolean;
  isExiting: boolean;
  onSaveClick: Function;
  onDescriptionChange: Function;
  onNoteTitleChange: Function;
}
