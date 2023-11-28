import { Dispatch, createContext, useContext, useReducer } from "react";
import { NoteData } from "../lib/client/types";

interface NotesState {
  rootNotes: NoteData[];
  currentDragId: string | null;
  notesMap: Map<string, NoteData>;
}

export const NotesContext = createContext({} as NotesState);
export const NotesDispatchContext = createContext({} as Dispatch<any>);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <NotesContext.Provider value={state}>
      <NotesDispatchContext.Provider value={dispatch}>
        {children}
      </NotesDispatchContext.Provider>
    </NotesContext.Provider>
  );
}

export function useNotesState() {
  return useContext(NotesContext);
}

export function useNotesDispatch() {
  return useContext(NotesDispatchContext);
}

function reducer(state: NotesState, action: any) {
  console.log(state, action);
  switch (action.type) {
    case "set_root_notes":
      return setRootNotes(state, action);
    case "add_new_note_to_root_notes":
      return addNewNoteToRootNotes(state, action);
    case "sort_notes":
      return sortNotes(state, action);
    case "update_current_drag_id":
      return updateCurrentDragId(state, action);
    case "change_parent":
      return changeParent(state, action);
    default:
      return state;
  }
}

const initialState = {
  rootNotes: [],
  currentDragId: null,
  notesMap: new Map<string, NoteData>(),
};

function setRootNotes(state: NotesState, action: any) {
  addNotesToCache(state.notesMap, action.payload);
  return {
    ...state,
    rootNotes: action.payload,
  };
}

function addNewNoteToRootNotes(state: NotesState, action: any) {
  addNotesToCache(state.notesMap, [action.payload]);
  const newRootNotes = [...state.rootNotes];
  newRootNotes.unshift(action.payload);
  return {
    ...state,
    rootNotes: newRootNotes,
  };
}

function sortNotes(state: NotesState, action: any) {
  const newState = {
    ...state,
  };
  sortNotesRecursively(newState.rootNotes, action.sortKey);
  return newState;
}

function sortNotesRecursively(notes: NoteData[], sortKey: any) {
  notes.sort((a: NoteData, b: NoteData) => {
    const reverse = sortKey.startsWith("-");
    const key = reverse ? sortKey.slice(1) : sortKey;

    if (a[key as keyof NoteData] < b[key as keyof NoteData]) {
      return reverse ? 1 : -1;
    }

    if (a[key as keyof NoteData] > b[key as keyof NoteData]) {
      return reverse ? -1 : 1;
    }

    return 0;
  });

  notes.forEach((note: NoteData) => {
    if (note.child_notes.length > 0) {
      sortNotesRecursively(note.child_notes, sortKey);
    }
  });
}

function updateCurrentDragId(state: NotesState, action: any) {
  return {
    ...state,
    currentDragId: action.payload,
  };
}

function changeParent(state: NotesState, action: any) {
  // get currently dragging note
  // get old parent
  // get new parent
  // remove the currently dragging note from old parent
  // add the currently dragging note to new parent
  // return the new state
  return state;
}

function addNotesToCache(notesMap: Map<string, NoteData>, notes: NoteData[]) {
  notes.forEach((note) => {
    notesMap.set(note.id, note);
  });
}
