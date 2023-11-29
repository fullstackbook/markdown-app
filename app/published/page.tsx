import Link from "next/link";
import { sql } from "../lib/server/db";
import { DateTime } from "luxon";
import Search from "../ui/search";
import SortSelectServer from "../ui/sort-select-server";

async function getNotes(query?: string, sort?: string) {
  let sqlStr = "select * from notes where is_published = true";
  let values = [];

  if (query != undefined) {
    sqlStr += " and title ilike $1";
    values.push("%" + query + "%");
  }

  if (sort != undefined) {
    switch (sort) {
      case "title":
        sqlStr += " order by title asc";
        break;
      case "-title":
        sqlStr += " order by title desc";
        break;
      case "created_at":
        sqlStr += " order by created_at asc";
        break;
      case "-created_at":
        sqlStr += " order by created_at desc";
        break;
      case "updated_at":
        sqlStr += " order by updated_at asc";
        break;
      case "-updated_at":
        sqlStr += " order by updated_at desc";
        break;
      default:
        break;
    }
  } else {
    sqlStr += " order by title asc";
  }

  const notesRes = await sql(sqlStr, values);
  return notesRes.rows;
}

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string; sort?: string };
}) {
  const query = searchParams?.query;
  const sort = searchParams?.sort;
  const notes = await getNotes(query, sort);

  return (
    <div className="m-2">
      <h2 className="bg-yellow-300 text-black p-2 font-bold my-2">
        Published Notes
      </h2>
      <div className="flex flex-row text-black">
        <div className="flex flex-col m-2 gap-y-2">
          <Search />
          <SortSelectServer />
        </div>
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
