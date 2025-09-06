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
  return <div>
    <form onSubmit={loginHandler}>
    <h2>LOGIN</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">log in</button>
    </form>
  </div>;
}

export default login;
