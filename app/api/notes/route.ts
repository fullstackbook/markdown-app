import { getCurrentUser } from "@/app/lib/server/auth";
import { sql } from "@/app/lib/server/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parent_id = searchParams.get("parent_id");

  const user = await getCurrentUser();

  let notesRes = null;
  if (parent_id) {
    notesRes = await sql(
      "select * from notes where user_id = $1 and parent_id = $2 order by title asc",
      [user.id, parent_id]
    );
  } else {
    notesRes = await sql(
      "select * from notes where user_id = $1 and parent_id is null order by title asc",
      [user.id]
    );
  }

  const ids = notesRes.rows.map((row) => row.id);
  console.log(ids);

  const child_notes_count = await sql(
    "select parent_id, count(*)::int from notes where parent_id = any($1) group by parent_id",
    [ids]
  );

  const childNoteCountMap = child_notes_count.rows.reduce((map, row) => {
    map[row.parent_id] = row.count;
    return map;
  }, {});

  console.log(childNoteCountMap);

  notesRes.rows.forEach((row) => {
    if (childNoteCountMap.hasOwnProperty(row.id)) {
      row.child_count = childNoteCountMap[row.id];
    } else {
      row.child_count = 0;
    }
  });

  return NextResponse.json(notesRes.rows);
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  const noteRes = await sql(
    "insert into notes (title, user_id) values ('Untitled', $1) returning *",
    [user.id]
  );
  return NextResponse.json(noteRes.rows[0]);
}
