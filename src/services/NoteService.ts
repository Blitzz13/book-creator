import { INote } from "../interfaces/service/note/INote";
import INoteService from "../interfaces/service/note/INoteService";
import { INoteSearchCriteria } from "../interfaces/service/note/ISearchCriteriaNote";

export default class NoteService implements INoteService {
  private _url = "/api/notes";
  
  public async getAllBaseNotes(bookId: string): Promise<INote[]> {
    const response = await fetch(`${this._url}/titles/${bookId}`, {
      method: "GET",
    });
    
    const json = await response.json();

    if (response.ok) {
      return json;
    }

    throw new Error(`Fetching notes failed with ${response.statusText}`);
  }

  getSpecificNote(): Promise<INote> {
    throw new Error("Method not implemented.");
  }

  createNote(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  updateNote(noteId: string): Promise<INote> {
    throw new Error("Method not implemented.");
  }

  deleteNote(noteId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  getNotesByCriteria(criteria: INoteSearchCriteria): Promise<INote[]> {
    throw new Error("Method not implemented.");
  }
}
