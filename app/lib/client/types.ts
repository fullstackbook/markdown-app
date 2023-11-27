export interface NoteData {
  id: string;
  user_id: string;
  parent_id: string;
  title: string;
  content: string;
  is_published: boolean;
  created_at: Date;
  updated_at: Date;
  child_notes: NoteData[];
  child_count: number;
}
