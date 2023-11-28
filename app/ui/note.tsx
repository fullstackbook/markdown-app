import { DateTime } from "luxon";
import { NoteData } from "../lib/client/types";
import { useNotesDispatch, useNotesState } from "../contexts/notes-context";
import { updateParent } from "../lib/client/api";

export default function Note({ note }: { note: NoteData }) {
  const state = useNotesState();
  const dispatch = useNotesDispatch();

  function handleDragStart(e: React.DragEvent) {
    console.log("drag start");
    dispatch({
      type: "update_current_drag_id",
      payload: note.id,
    });
  }

  function handleDragEnd(e: React.DragEvent) {
    console.log("drag end");
  }

  async function handleDrop(e: React.DragEvent) {
    console.log("drop", note.id);
    console.log("current drag id", state.currentDragId);

    if (note.id === state.currentDragId) {
      alert("cannot move note into self");
      return;
    }

    // TODO: check if target note is descendent of current dragging note

    // update parent api call
    await updateParent(state.currentDragId!, note.id);

    // dispatch change_parent event
    dispatch({
      type: "change_parent",
      newParentId: note.id,
      currentDragId: state.currentDragId,
    });
  }

  function handleDragOver(e: React.DragEvent) {
    console.log("drag over");
    e.preventDefault();
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
