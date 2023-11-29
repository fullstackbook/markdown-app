"use server";

import { z } from "zod";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { sql } from "@/app/lib/server/db";
import config from "@/app/lib/server/config";

const SignUpSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

type State = {
  errors?: {
    username?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string | null;
};

export async function signup(prevState: State, formData: FormData) {
  const username = formData.get("username");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  const validatedFields = SignUpSchema.safeParse({
    username: username,
    password: password,
    confirmPassword: confirmPassword,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Sign up error",
    };
  }

  if (password !== confirmPassword) {
    return {
      message: "Password and Confirm Password must match",
    };
  }

  const userRes = await sql("select * from users where username = $1", [
    username,
  ]);

  if (userRes.rowCount && userRes.rowCount > 0) {
    return {
      message: "User already exists",
    };
  }

  const saltRounds = 10;
  const hash = await bcrypt.hash(password?.toString()!, saltRounds);

  const insertRes = await sql(
    "insert into users (username, password) values ($1, $2) returning *",
    [username, hash]
  );

  if (insertRes.rowCount === 1) {
    const user = insertRes.rows[0];
    const token = await new SignJWT({})
      .setProtectedHeader({ alg: "HS256" })
      .setSubject(user.id)
      .setIssuedAt()
      .setExpirationTime("2w")
      .sign(new TextEncoder().encode(config.JWT_SECRET));

    const oneDay = 24 * 60 * 60 * 1000;
    const twoWeeks = oneDay * 14;

    cookies().set("jwt-token", token, {
      sameSite: "strict",
      httpOnly: true,
      secure: true,
      expires: Date.now() + twoWeeks,
    });

    redirect("/dashboard");
  }
}
