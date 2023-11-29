import { DateTime } from "luxon";
import { useState } from "react";

import { NoteData } from "../lib/client/types";
import { useNotesDispatch, useNotesState } from "../contexts/notes-context";
import { fetchNotes, updateParent } from "../lib/client/api";
import NoteList from "./note-list";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Note({
  note,
  depth,
}: {
  note: NoteData;
  depth: number;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const state = useNotesState();
  const dispatch = useNotesDispatch();
  const [isTarget, setIsTarget] = useState(false);

  function handleClick(e: React.MouseEvent, id: string) {
    e.stopPropagation();
    console.log(id);
    const params = new URLSearchParams(searchParams);
    params.set("note_id", id);
    replace(`${pathname}?${params.toString()}`);
  }

  function handleDragStart(e: React.DragEvent) {
    console.log("drag start");
    dispatch({
      type: "update_current_drag_id",
      payload: note.id,
    });
  }

  function handleDragEnd(e: React.DragEvent) {
    console.log("drag end");
    setIsTarget(false);
  }

  async function handleDrop(e: React.DragEvent) {
    console.log("drop", note.id);
    console.log("current drag id", state.currentDragId);
    setIsTarget(false);

    if (note.id === state.currentDragId) {
      alert("cannot move note into self");
      return;
    }

    // check if target note is descendent of current dragging note
    if (
      checkIfNoteIsDescendent(
        state.notesMap,
        state.notesMap.get(note.id)!,
        state.notesMap.get(state.currentDragId!)!
      )
    ) {
      alert("invalid action. cannot move note into descendent note.");
      return;
    }

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
    e.stopPropagation();
    console.log("drag enter");
    if (e.currentTarget === e.relatedTarget) {
      setIsTarget(true);
    }
  }

  function handleDragLeave(e: React.DragEvent) {
    e.stopPropagation();
    console.log("drag leave");

    // @ts-ignore
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsTarget(false);
    }
  }

  async function handleExpand(e: React.MouseEvent) {
    const childNotes = await fetchNotes(note.id);
    dispatch({
      type: "add_child_notes_to_note",
      payload: childNotes,
      id: note.id,
    });
  }

  /**
   * Check if noteA is a descendent of noteB
   * @param notesMap
   * @param noteA
   * @param noteB
   * @returns
   */
  function checkIfNoteIsDescendent(
    notesMap: Map<string, NoteData>,
    noteA: NoteData,
    noteB: NoteData
  ) {
    let curNote = noteA;
    while (curNote.parent_id) {
      curNote = notesMap.get(curNote.parent_id)!;
      if (curNote.id === noteB.id) {
        return true;
      }
    }
    return false;
  }

  return (
    <div>
      <div
        className={clsx(
          "p-2 text-black border-2 border-yellow-300 hover:border-blue-700 cursor-pointer",
          { "bg-red-700": isTarget, "bg-yellow-300": !isTarget }
        )}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onClick={(e) => handleClick(e, note.id)}
      >
        <div>{note.title}</div>
        <div>{note.id}</div>
        <div>{note.created_at.toLocaleString(DateTime.DATETIME_SHORT)}</div>
        <div>{note.updated_at.toLocaleString(DateTime.DATETIME_SHORT)}</div>
        <div>{note.is_published ? "published" : "draft"}</div>
      </div>
      {note.child_count > 0 && (
        <button className="bg-red-700 text-white p-2" onClick={handleExpand}>
          expand
        </button>
      )}
      {note.child_notes?.length > 0 && (
        <NoteList notes={note.child_notes} depth={depth + 1} />
      )}
    </div>
  );
}
