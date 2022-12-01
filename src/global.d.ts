import { MantineColor } from "@mantine/core";

export { };
declare global {

  type RawNote = {
    id: string
  } & RawNoteData

  type RawNoteData = {
    title: string;
    content: string;
    tags: string[];
  }

  type Note = {
    id: string
  } & NoteData

  type NoteData = {
    title: string;
    content: string;
    tags: Tag[];
  };
  type Tag = {
    id: string;
    label: string;
    color?: MantineColor;
  };
  type Folder = {
    id: string,
    notes: Note[]
  }
  type RawFolder = {
    id: string,
    notes: string[]
  }
}
