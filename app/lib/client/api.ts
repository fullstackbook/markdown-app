import { DateTime } from "luxon";
import { NoteData } from "./types";

export async function fetchNotes(parent_id?: string) {
  let queryString = "";
  if (parent_id) {
    queryString += "?parent_id=" + parent_id;
  }
  const notesRes = await fetch("/api/notes" + queryString);
  const json = await notesRes.json();
  console.log(json);
  const transformed = json.map((data: any) => {
    return transformJsonToNote(data);
  });
  return transformed;
}

export async function createNote() {
  const res = await fetch("/api/notes", {
    method: "POST",
  });
  const json = await res.json();
  return transformJsonToNote(json);
}

export async function updateParent(currentDragId: string, newParentId: string) {
  await fetch("/api/notes/" + currentDragId + "/update_parent", {
    method: "POST",
    body: JSON.stringify({
      parent_id: newParentId,
    }),
  });
}

export async function fetchNote(note_id: string) {
  const noteRes = await fetch("/api/notes/" + note_id);
  const json = await noteRes.json();
  return transformJsonToNote(json);
}

export async function updateNote(note: NoteData) {
  const res = await fetch("/api/notes/" + note.id, {
    method: "PUT",
    body: JSON.stringify(note),
  });
  const json = await res.json();
  return transformJsonToNote(json);
}

function transformJsonToNote(json: any): NoteData {
  return {
    ...json,
    created_at: DateTime.fromISO(json.created_at),
    updated_at: DateTime.fromISO(json.updated_at),
    child_notes: [],
  };
}
