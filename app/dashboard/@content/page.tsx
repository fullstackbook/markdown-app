"use client";

import { fetchNote } from "@/app/lib/client/api";
import { NoteData } from "@/app/lib/client/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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

  return <div>{curNote?.title}</div>;
}
