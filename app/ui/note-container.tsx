"use client";

import { useEffect } from "react";
import { useNotesDispatch, useNotesState } from "../contexts/notes-context";
import { fetchNotes } from "../lib/client/api";
import NoteList from "./note-list";
import CreateNoteBtn from "./create-note-btn";

export default function NoteContainer() {
  const state = useNotesState();
  const dispatch = useNotesDispatch();

  useEffect(() => {
    async function init() {
      console.log("init");
      const notes = await fetchNotes();
      dispatch({
        type: "set_root_notes",
        payload: notes,
      });
    }

    init();
  }, [dispatch]);

  if (!state.rootNotes) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <CreateNoteBtn />
      <NoteList notes={state.rootNotes} />
    </div>
  );
}
