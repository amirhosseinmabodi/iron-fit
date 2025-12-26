"use client";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../../lib/firebase";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* ---------- MODAL STATE ---------- */
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const showError = (message: string) => {
    setModalMessage(message);
    setModalOpen(true);
  };

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

      router.push("/dashbord");
    } catch (err: any) {
      console.log(err);
      
      /* ---------- FIREBASE ERROR HANDLING ---------- */
      let message = "Something went wrong. Please try again.";

      if (err.code === "auth/user-not-found") {
        message = "No account found with this email.";
      } else if (err.code === "auth/wrong-password") {
        message = "Incorrect password.";
      } else if (err.code === "auth/invalid-email") {
        message = "Invalid email address.";
      }

      showError(message);
    }
  };

  return (
    <>
      {/* ---------- ERROR MODAL ---------- */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm text-center">
            <h2 className="text-xl font-bold text-red-500 mb-3">
              Login Failed
            </h2>

            <p className="text-gray-600 mb-6">{modalMessage}</p>

            <button
              onClick={() => setModalOpen(false)}
              className="w-full py-2 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* ---------- LOGIN CARD ---------- */}
      <div className="flex justify-center items-center min-h-screen px-4 bg-gray-50">
        <form
          onSubmit={loginHandler}
          className="bg-white w-full max-w-md p-10 rounded-2xl shadow-2xl flex flex-col gap-6"
        >
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-orange-500">
              Welcome Back
            </h2>
            <p className="text-gray-500 mt-2">
              Sign in to your IronFit account
            </p>
          </div>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 px-4 rounded-xl border border-gray-300 outline-orange-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 px-4 rounded-xl border border-gray-300 outline-orange-500"
          />

          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-orange-500 text-white font-bold text-lg hover:bg-orange-600 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
