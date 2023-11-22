"use client";

import { useFormState } from "react-dom";

import { signup } from "./actions";

export default function SignUpForm() {
  const initialState = { message: null, errors: {} };

  // @ts-ignore
  const [state, dispatch] = useFormState(signup, initialState);

  return (
    <div className="flex flex-col gap-2 w-full">
      <h1 className="bg-yellow-300 p-2 text-center font-bold text-black">
        Sign Up
      </h1>
      <form action={dispatch} className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <label>Username</label>
          <input
            id="username"
            name="username"
            type="text"
            className="block bg-blue-700 p-2 text-white"
          />
          {state?.errors?.username?.map((error: string) => (
            <p className="text-red-500" key={error}>
              {error}
            </p>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <label>Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className="block bg-blue-700 p-2 text-white"
          />
          {state?.errors?.password?.map((error: string) => (
            <p className="text-red-500" key={error}>
              {error}
            </p>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <label>Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className="block bg-blue-700 text-white p-2"
          />
          {state?.errors?.confirmPassword?.map((error: string) => (
            <p className="text-red-500" key={error}>
              {error}
            </p>
          ))}
        </div>
        <button type="submit" className="bg-red-700 p-2 text-white mt-3">
          Submit
        </button>
        {state?.message && <p className="text-red-500">{state.message}</p>}
      </form>
    </div>
  );
}
