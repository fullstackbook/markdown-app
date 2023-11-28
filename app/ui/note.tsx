import { DateTime } from "luxon";
import { NoteData } from "../lib/client/types";

export default function Note({ note }: { note: NoteData }) {
  function handleDragStart(e: React.DragEvent) {
    console.log("drag start");
  }

  function handleDragEnd(e: React.DragEvent) {
    console.log("drag end");
  }

  function handleDrop(e: React.DragEvent) {
    console.log("drop");
  }

  function handleDragOver(e: React.DragEvent) {
    console.log("drag over");
  }

  function handleDragEnter(e: React.DragEvent) {
    console.log("drag enter");
  }

  function handleDragLeave(e: React.DragEvent) {
    console.log("drag leave");
  }

  return (
    <div
      className="p-2 text-black bg-yellow-300 border-2 border-yellow-300 hover:border-blue-700 cursor-pointer"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <div>{note.title}</div>
      <div>{note.id}</div>
      <div>{note.created_at.toLocaleString(DateTime.DATETIME_SHORT)}</div>
      <div>{note.updated_at.toLocaleString(DateTime.DATETIME_SHORT)}</div>
      <div>{note.is_published ? "published" : "draft"}</div>
    </div>
  );
}
