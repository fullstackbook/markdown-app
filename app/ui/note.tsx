import { DateTime } from "luxon";
import { NoteData } from "../lib/client/types";

export default function Note({ note }: { note: NoteData }) {
  return (
    <div className="p-2 text-black bg-yellow-300 border-2 border-yellow-300 hover:border-blue-700 cursor-pointer">
      <div>{note.title}</div>
      <div>{note.id}</div>
      <div>{note.created_at.toLocaleString(DateTime.DATETIME_SHORT)}</div>
      <div>{note.updated_at.toLocaleString(DateTime.DATETIME_SHORT)}</div>
      <div>{note.is_published ? "published" : "draft"}</div>
    </div>
  );
}
