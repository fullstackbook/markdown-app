"use client";

import AceEditor from "react-ace";
import ReactMarkdown from "react-markdown";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-github_dark";

import { useNotesDispatch } from "@/app/contexts/notes-context";
import { fetchNote, updateNote } from "@/app/lib/client/api";
import { NoteData } from "@/app/lib/client/types";
import style from "./markdown-styles.module.css";

export default function Page() {
  const searchParams = useSearchParams();
  const [curNote, setCurNote] = useState<NoteData | null>(null);
  const dispatch = useNotesDispatch();

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
    dispatch({
      type: "update_note",
      payload: updatedNote,
    });
  }, 300);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newNote = {
      ...curNote!,
      title: e.target.value,
    };
    setCurNote(newNote);
    await handleUpdateNote(newNote);
  }

  async function handleMarkdownChange(newMarkdown: string) {
    const newNote = {
      ...curNote!,
      content: newMarkdown,
    };
    setCurNote(newNote);
    await handleUpdateNote(newNote);
  }

  async function handlePublish() {
    const newNote = {
      ...curNote!,
      is_published: !curNote?.is_published,
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
          <div className="flex flex-row">
            <div className="flex-1 m-2">
              <AceEditor
                mode="markdown"
                theme="github_dark"
                name="markdown-editor"
                onChange={handleMarkdownChange}
                value={curNote.content}
                width="100%"
                height="80vh"
                wrapEnabled={true}
                fontSize="16px"
              />
            </div>
            <div className="flex-1 m-2">
              <ReactMarkdown className={style.reactMarkdown}>
                {curNote.content}
              </ReactMarkdown>
            </div>
          </div>
          <div className="p-2 flex flex-row gap-2">
            <label>Published</label>
            <input
              type="checkbox"
              checked={curNote.is_published}
              onChange={handlePublish}
            />
          </div>
        </div>
      )}
    </div>
  );
}
