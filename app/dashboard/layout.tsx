"use client";

import { NotesProvider } from "../contexts/notes-context";

export default function Layout(props: {
  sidebar: React.ReactNode;
  content: React.ReactNode;
}) {
  return (
    <NotesProvider>
      <div className="flex flex-row">
        {props.sidebar}
        {props.content}
      </div>
    </NotesProvider>
  );
}
