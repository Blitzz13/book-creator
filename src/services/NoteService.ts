import { IBaseNote } from "../interfaces/service/note/IBaseNote";
import { INote } from "../interfaces/service/note/INote";
import INoteCreationRequest from "../interfaces/service/note/INoteCreationRequest";
import INoteService from "../interfaces/service/note/INoteService";
import INoteUpdateRequest from "../interfaces/service/note/INoteUpdateRequest";
import { INoteSearchCriteria } from "../interfaces/service/note/ISearchCriteriaNote";

export default class NoteService implements INoteService {
  private _url = "/api/notes";

  public async getAllBaseNotes(bookId: string): Promise<IBaseNote[]> {
    const response = await fetch(`${this._url}/titles/${bookId}`, {
      method: "GET",
    });

    const json = await response.json();

    if (response.ok) {
      return json;
    }

    throw new Error(`Fetching notes failed with ${response.statusText}`);
  }

  async getSpecificNote(noteId: string): Promise<INote> {
    const response = await fetch(`${this._url}/${noteId}`, {
      method: "GET",
    });

    const json = await response.json();

    if (response.ok) {
      return json;
    }

    throw new Error(`Fetching notes failed with ${response.statusText}`);
  }

  public async createNote(request: INoteCreationRequest): Promise<void> {
    const response = await fetch(`${this._url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });

    const json = await response.json();

    if (response.ok) {
      return json;
    }
  }

  public async updateNote(noteId: string,request: INoteUpdateRequest): Promise<INote> {
    const response = await fetch(`${this._url}/${noteId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });

    const json = await response.json();

    if (response.ok) {
      return json;
    }

    throw new Error(`Updating note failed with ${response.statusText}`);
  }

  public async deleteNote(noteId: string): Promise<void> {
    const response = await fetch(`${this._url}/${noteId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const json = await response.json();

    if (response.ok) {
      return json;
    }

    throw new Error(`Deleting note failed with ${response.statusText}`);
  }

  getNotesByCriteria(criteria: INoteSearchCriteria): Promise<INote[]> {
    throw new Error("Method not implemented.");
  }
}
