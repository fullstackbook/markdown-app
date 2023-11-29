import { useNotesDispatch } from "../contexts/notes-context";
import { createNote } from "../lib/client/api";

export default function CreateNoteBtn() {
  const dispatch = useNotesDispatch();

  async function handleClick() {
    const json = await createNote();
    dispatch({
      type: "add_new_note_to_root_notes",
      payload: json,
    });
  }

  return (
    <button
      className="text-white block bg-red-700 p-2 my-2"
      onClick={handleClick}
    >
      Create Note
    </button>
  );
}
