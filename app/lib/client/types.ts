import { DateTime } from "luxon";

export interface NoteData {
  id: string;
  user_id: string;
  parent_id: string;
  title: string;
  content: string;
  is_published: boolean;
  created_at: DateTime;
  updated_at: DateTime;
  child_notes: NoteData[];
  child_count: number;
}
