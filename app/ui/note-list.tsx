import { NoteData } from "../lib/client/types";
import Note from "./note";

export default function NoteList({ notes }: { notes: NoteData[] }) {
  return (
    <div>
      {notes.map((note: NoteData) => (
        <div key={note.id} className="my-2">
          <Note note={note} />
        </div>
      ))}
    </div>
  );
}
