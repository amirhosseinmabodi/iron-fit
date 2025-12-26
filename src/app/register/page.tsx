"use client";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

function Register() {
  const router = useRouter();

  const [data, setData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    age: "",
    gender: "",
  });

  /* ---------- MODAL STATE ---------- */
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const showError = (message: string) => {
    setModalMessage(message);
    setModalOpen(true);
  };

  const inputHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!data.name || !data.lastname || !data.email || !data.password) {
      showError("Please fill in all required fields.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        age: Number(data.age),
        gender: data.gender === "true",
        createdAt: new Date(),
      });

      setCookie("UID", user.uid, { maxAge: 60 * 60 * 24 * 7 });
      router.push("/dashbord");
    } catch (err: any) {
      /* ---------- FIREBASE ERROR MAPPING ---------- */
      let message = "Something went wrong. Please try again.";

      if (err.code === "auth/email-already-in-use") {
        message = "This email is already registered.";
      } else if (err.code === "auth/weak-password") {
        message = "Password should be at least 6 characters.";
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
              Registration Failed
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

      {/* ---------- REGISTER CARD ---------- */}
      <div className="flex justify-center items-center min-h-screen px-4 bg-gray-50">
        <form
          onSubmit={submitHandler}
          className="bg-white w-full max-w-md p-10 rounded-2xl shadow-2xl flex flex-col gap-5"
        >
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-orange-500">
              Create Account
            </h2>
            <p className="text-gray-500 mt-2">
              Join IronFit and start training
            </p>
          </div>

          <input
            name="name"
            placeholder="First Name"
            onChange={inputHandler}
            value={data.name}
            className="input"
          />

          <input
            name="lastname"
            placeholder="Last Name"
            onChange={inputHandler}
            value={data.lastname}
            className="input"
          />

          <input
            name="age"
            type="number"
            placeholder="Age"
            onChange={inputHandler}
            value={data.age}
            className="input"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={inputHandler}
            value={data.email}
            className="input"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={inputHandler}
            value={data.password}
            className="input"
          />

          <select
            name="gender"
            onChange={inputHandler}
            value={data.gender}
            className="input"
          >
            <option value="">Select Gender</option>
            <option value="true">Male</option>
            <option value="false">Female</option>
          </select>

          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-orange-500 text-white font-bold text-lg hover:bg-orange-600 transition"
          >
            Register
          </button>
        </form>
      </div>

      {/* ---------- INPUT STYLE ---------- */}
      <style jsx>{`
        .input {
          width: 100%;
          height: 48px;
          padding: 0 16px;
          border-radius: 12px;
          border: 1px solid #d1d5db;
          outline-color: #f97316;
        }
      `}</style>
    </>
  );
}

export default Register;
