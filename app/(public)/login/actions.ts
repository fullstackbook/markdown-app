"use server";

import { z } from "zod";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

import { sql } from "@/app/lib/server/db";
import config from "@/app/lib/server/config";

const LoginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(6),
});

type State = {
  errors?: {
    username?: string[];
    password?: string[];
  };
  message?: string | null;
};

export async function login(prevState: State, formData: FormData) {
  const validatedFields = LoginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Log in error",
    };
  }

  const username = formData.get("username");
  const password = formData.get("password");

  const userRes = await sql("select * from users where username = $1", [
    username,
  ]);

  if (userRes.rowCount === 0) {
    return {
      message: "User not found",
    };
  }

  const user = userRes.rows[0];

  const isMatch = await bcrypt.compare(password?.toString()!, user.password);

  if (isMatch) {
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

  return {
    message: "Credentials invalid",
  };
}
