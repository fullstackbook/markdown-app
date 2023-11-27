import { cookies } from "next/headers";
import config from "./config";
import { jwtVerify } from "jose";
import { sql } from "./db";

export async function getJWTPayload() {
  const cookieStore = cookies();
  const token = cookieStore.get("jwt-token");
  const secret = new TextEncoder().encode(config.JWT_SECRET);
  const { payload, protectedHeader } = await jwtVerify(token?.value!, secret);
  return payload;
}

export async function getCurrentUser() {
  const payload = await getJWTPayload();
  const userRes = await sql("select * from users where id = $1", [payload.sub]);
  return userRes.rows[0];
}
