import Link from "next/link";
import { sql } from "../lib/server/db";
import { DateTime } from "luxon";

async function getNotes() {
  let sqlStr = "select * from notes where is_published = true";
  const notesRes = await sql(sqlStr);
  return notesRes.rows;
}

export default async function Page() {
  const notes = await getNotes();

  return (
    <div className="m-2">
      <h2 className="bg-yellow-300 text-black p-2 font-bold my-2">
        Published Notes
      </h2>
      <div className="flex flex-row text-black">
        <div className="m-2">
          {notes.map((note) => {
            return (
              <Link
                href={`/published/${note.id}`}
                key={note.id}
                className="p-2 bg-yellow-300 mb-2 block"
              >
                <div>{note.title}</div>
                <div>
                  Created:{" "}
                  {note.created_at.toLocaleString(DateTime.DATETIME_SHORT)}
                </div>
                <div>
                  Updated:{" "}
                  {note.updated_at.toLocaleString(DateTime.DATETIME_SHORT)}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
