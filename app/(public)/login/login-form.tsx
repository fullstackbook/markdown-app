"use client";

import { useFormState } from "react-dom";

import { login } from "./actions";

export default function LoginForm() {
  const initialState = { message: null, errors: {} };
  // @ts-ignore
  const [state, dispatch] = useFormState(login, initialState);

  return (
    <div className="flex flex-col gap-2 w-full">
      <h1 className="bg-yellow-300 p-2 font-bold text-center text-black">
        Log In
      </h1>
      <form action={dispatch} className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <label>Username</label>
          <input
            id="username"
            name="username"
            type="text"
            className="bg-blue-700 p-2 text-white block"
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
            className="bg-blue-700 p-2 text-white block"
          />
          {state?.errors?.password?.map((error: string) => (
            <p className="text-red-500" key={error}>
              {error}
            </p>
          ))}
        </div>
        <button type="submit" className="bg-red-700 text-white p-2 mt-3">
          Submit
        </button>
        {state?.message && <p className="text-red-500">{state.message}</p>}
      </form>
    </div>
  );
}
