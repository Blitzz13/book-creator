import { IBaseNote } from "./IBaseNote";
import { INote } from "./INote";
import INoteCreationRequest from "./INoteCreationRequest";
import INoteUpdateRequest from "./INoteUpdateRequest";
import { INoteSearchCriteria } from "./ISearchCriteriaNote";

export default interface INoteService {
  getAllBaseNotes(bookId: string): Promise<IBaseNote[]>;
  getSpecificNote(noteId: string): Promise<INote>;
  createNote(request: INoteCreationRequest): Promise<void>;
  updateNote(noteId: string, request: INoteUpdateRequest): Promise<INote>;
  deleteNote(noteId: string): Promise<void>;
  getNotesByCriteria(criteria: INoteSearchCriteria): Promise<INote[]>;
}
