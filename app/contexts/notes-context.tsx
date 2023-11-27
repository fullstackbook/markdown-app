import { Dispatch, createContext, useContext, useReducer } from "react";
import { NoteData } from "../lib/client/types";

interface NotesState {
  rootNotes: NoteData[];
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
    default:
      return state;
  }
}

const initialState = {
  rootNotes: [],
};
