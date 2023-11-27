import { DateTime } from "luxon";
import { NoteData } from "../lib/client/types";

export default function Note({ note }: { note: NoteData }) {
  return (
    <div>
      <div>{note.title}</div>
      <div>{note.id}</div>
      <div>{note.created_at.toLocaleString(DateTime.DATETIME_SHORT)}</div>
      <div>{note.updated_at.toLocaleString(DateTime.DATETIME_SHORT)}</div>
      <div>{note.is_published ? "published" : "draft"}</div>
    </div>
  );
}
