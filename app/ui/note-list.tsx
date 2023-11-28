import { NoteData } from "../lib/client/types";
import Note from "./note";

export default function NoteList({
  notes,
  depth = 0,
}: {
  notes: NoteData[];
  depth?: number;
}) {
  return (
    <div style={{ marginLeft: `${depth * 10}px` }}>
      {notes.map((note: NoteData) => (
        <div key={note.id} className="my-2">
          <Note note={note} depth={depth + 1} />
        </div>
      ))}
    </div>
  );
}
