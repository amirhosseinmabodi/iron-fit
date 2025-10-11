"use client";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { useState } from "react";

export default function LoginAdmin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = () => {
    if (username === "admin" && password === "1234") {
      setCookie("isAdmin", "true"); 
      router.push("/login-admin/dashbord");
    } else {
      alert("username or password is wrong!");
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl mb-4">Admin Login</h2>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 block mb-3"
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 block mb-3"
      />
      <button
        onClick={loginHandler}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Login
      </button>
    </div>
  );
}
