"use client";

import { fetchNote, updateNote } from "@/app/lib/client/api";
import { NoteData } from "@/app/lib/client/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function Page() {
  const searchParams = useSearchParams();
  const [curNote, setCurNote] = useState<NoteData | null>(null);

  async function refreshNote(note_id: string) {
    console.log("refresh note", note_id);

    const note = await fetchNote(note_id);
    setCurNote(note);
  }

  useEffect(() => {
    console.log(searchParams);
    const note_id = searchParams.get("note_id");
    console.log("content container", note_id);
    if (note_id !== null && curNote?.id !== note_id) {
      refreshNote(note_id);
    }
  }, [searchParams, curNote]);

  const handleUpdateNote = useDebouncedCallback(async (note: NoteData) => {
    const updatedNote = await updateNote(note);
    console.log("updated note", updatedNote);
  }, 300);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newNote = {
      ...curNote!,
      title: e.target.value,
    };
    setCurNote(newNote);
    await handleUpdateNote(newNote);
  }

  return (
    <div className="p-2 flex-auto w-2/3">
      {curNote && (
        <div className="p-2">
          <input
            type="text"
            value={curNote.title}
            className="p-2 bg-blue-700 text-yellow-300 font-bold block w-full focus:bg-red-700"
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
}
