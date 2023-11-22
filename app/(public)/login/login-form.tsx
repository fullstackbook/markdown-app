"use client";

export default function LoginForm() {
  return (
    <div>
      <h1>Log In</h1>
      <form>
        <div>
          <label>Username</label>
          <input id="username" name="username" type="text" />
        </div>
        <div>
          <label>Password</label>
          <input id="password" name="password" type="password" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
