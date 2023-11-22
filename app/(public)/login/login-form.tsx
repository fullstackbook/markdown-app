"use client";

export default function LoginForm() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <h1 className="bg-yellow-300 p-2 font-bold text-center text-black">
        Log In
      </h1>
      <form className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <label>Username</label>
          <input
            id="username"
            name="username"
            type="text"
            className="bg-blue-700 p-2 text-white block"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className="bg-blue-700 p-2 text-white block"
          />
        </div>
        <button type="submit" className="bg-red-700 text-white p-2 mt-3">
          Submit
        </button>
      </form>
    </div>
  );
}
