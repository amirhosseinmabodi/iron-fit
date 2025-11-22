"use client";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { setCookie } from "cookies-next";

function register() {
  const [data, setsdata] = useState({
    name: "",
    email: "",
    password: "",
    lastname: "",
    age: 0,
    gender: null as boolean | null,
  });
  const inputHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let value: string | boolean = e.target.value;

    if (e.target.name === "gender") {
      value = e.target.value === "true";
    }
    setsdata({
      ...data,
      [e.target.name]: value,
    });
  };
  const submitHandler = async () => {
    if (!data.email.trim() || !data.name.trim() || !data.password.trim()) {
      console.error("input is empty!");
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
        password: data.password,
        age: data.age,
        gender: data.gender,
      });
      console.log("succsesful");
      setCookie("UID", user.uid, { maxAge: 60 * 60 * 24 * 7 });
      window.location.href = "http://localhost:3000/dashbord";
    } catch (err: any) {
      console.error(err.message || "somethings wrong");
    }
  };
  return (
    <div className="flex flex-col h-full w-fit m-auto my-4 p-8 justify-center items-center gap-8 shadow-2xl border border-gray-200 rounded-2xl">
      <input
        className="border border-gray-300 rounded px-4 py-2 outline-orange-500"
        name="name"
        type="text"
        placeholder="name"
        onChange={inputHandler}
        value={data.name}
      />
      <input
        className="border border-gray-300 rounded px-4 py-2 outline-orange-500"
        name="lastname"
        type="text"
        placeholder="lastname"
        onChange={inputHandler}
        value={data.lastname}
      />
      <input
        className="border border-gray-300 rounded px-4 py-2 outline-orange-500"
        name="age"
        type="number"
        placeholder="age"
        onChange={inputHandler}
        value={data.age}
      />
      <input
        className="border border-gray-300 rounded px-4 py-2 outline-orange-500"
        name="email"
        type="email"
        placeholder="email"
        onChange={inputHandler}
        value={data.email}
      />
      <input
        className="border border-gray-300 rounded px-4 py-2 outline-orange-500"
        name="password"
        type="password"
        placeholder="password"
        onChange={inputHandler}
        value={data.password}
      />
      <select
        className="border border-gray-300 rounded px-4 py-2 outline-orange-500"
        name="gender"
        onChange={inputHandler}
        value={data.gender === null ? "" : String(data.gender)}
      >
        <option value="true">male</option>
        <option value="false">female</option>
      </select>
      <button
        className="border bg-orange-500 py-4 px-15 rounded-full font-bold text-xl cursor-pointer hover:scale-105 transition duration-300 text-white border-gray-300 rounde"
        onClick={submitHandler}
      >
        submit
      </button>
    </div>
  );
}

export default register;
