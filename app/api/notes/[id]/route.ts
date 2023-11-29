import { getCurrentUser } from "@/app/lib/server/auth";
import { sql } from "@/app/lib/server/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const user = await getCurrentUser();

  const userNoteRes = await sql(
    "select * from notes where id = $1 and user_id = $2",
    [id, user.id]
  );

  if (userNoteRes.rowCount === 0) {
    return NextResponse.json({ message: "not found" }, { status: 404 });
  }

  return NextResponse.json(userNoteRes.rows[0]);
}
