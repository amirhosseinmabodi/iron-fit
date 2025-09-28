"use client";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../../lib/firebase";
import { setCookie } from "cookies-next";

function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;
      setCookie("UID", uid, { maxAge: 60 * 60 * 24 * 7 });
      window.location.href = "/dashbord";
    } catch (err: any) {
      setError(err.message);
    }
  };
  return (
    <div className="flex justify-center items-center px-4 py-16">
      <form
        className="shadow-2xl flex flex-col p-10 justify-center items-center gap-6 rounded-xl shadow-orange-500 "
        onSubmit={loginHandler}
      >
        <div className="text-center text-orange-500">
          <h2 className="font-bold text-2xl">Welcome Back</h2>
          <p className="text-sm mt-2 text-gray-500">Sign in to your IronFit account</p>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="outline-orange-500 w-full h-10 p-2 rounded border border-gray-300"
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="outline-orange-500 w-full h-10 p-2 rounded border border-gray-300"
        />
        <button className="bg-orange-500 w-full h-8 rounded-lg cursor-pointer text-white font-bold" type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default login;
