import { NoteModalMode } from "../../enums/NoteModalMode";

export default interface INoteModalModel{
  modalTitle: string;
  header: string;
  content: string;
  currentContent: string;
  isOpen: boolean;
  isExiting: boolean;
  mode: NoteModalMode;
}
