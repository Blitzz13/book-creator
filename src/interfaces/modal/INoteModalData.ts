import { NoteModalMode } from "../../enums/NoteModalMode";
import ICommonModalData from "./ICommonModalData";

export default interface INoteModalData<ContentStyle, OverlayStyle>
  extends ICommonModalData<ContentStyle, OverlayStyle> {
  noteData: {
    modalTitle: string;
    noteTitle: string;
    currentContent: string;
    initialDescription: string;
    onSaveClick: (mode: NoteModalMode) => void;
    onDescriptionChange: Function;
    onNoteTitleChange: Function;
    mode: NoteModalMode;
    displayName?: string;
    userId?: string;
  };
}
