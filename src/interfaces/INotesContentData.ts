import { IBaseNote } from "./service/note/IBaseNote";

export default interface INotesContentData {
  data: {
    notes: IBaseNote[];
    onNoteClick?: Function;
    onDeleteClick?: Function;
    onEditClick?: Function;
  };
}
