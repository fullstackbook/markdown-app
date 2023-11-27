"use client";

import { useEffect } from "react";
import { useNotesDispatch, useNotesState } from "../contexts/notes-context";
import { fetchNotes } from "../lib/client/api";
import NoteList from "./note-list";
import CreateNoteBtn from "./create-note-btn";
import SortSelect from "./sort-select";

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

  function handleChange(value: string) {
    dispatch({
      type: "sort_notes",
      sortKey: value,
    });
  }

  if (!state.rootNotes) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <CreateNoteBtn />
      <SortSelect onChange={handleChange} />
      <NoteList notes={state.rootNotes} />
    </div>
  );
}
