import { INote } from "./INote";
import { INoteSearchCriteria } from "./ISearchCriteriaNote";

export default interface INoteService {
  getAllBaseNotes(bookId: string): Promise<INote[]>;
  getSpecificNote(noteId: string): Promise<INote>;
  createNote(): Promise<void>;
  updateNote(noteId: string): Promise<INote>;
  deleteNote(noteId: string): Promise<void>;
  getNotesByCriteria(criteria: INoteSearchCriteria): Promise<INote[]>;
}
