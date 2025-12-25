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
      alert("Username or password is wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-orange-500 mb-8">
          Admin Login
        </h2>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Username
          </label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
          />
        </div>

        <button
          onClick={loginHandler}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold text-lg transition duration-300"
        >
          Login
        </button>

        <p className="text-xs text-gray-400 text-center mt-6">
          Restricted access for administrators only
        </p>
      </div>
    </div>
  );
}
