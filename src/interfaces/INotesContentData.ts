import { IBaseNote } from "./service/note/IBaseNote";
import { INote } from "./service/note/INote";

export default interface INotesContentData {
  data: {
    notes: IBaseNote[];
    onChapterClick?: Function;
  };
}
