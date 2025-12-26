"use client";

import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../lib/firebase";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/Loading";

export default function Profile() {
  const router = useRouter();
  const uid = String(getCookie("UID"));

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    age: "",
    gender: "",
  });

  // 🔹 fetch user data
  useEffect(() => {
    if (!uid) return;

    const fetchUser = async () => {
      try {
        const docRef = doc(db, "users", uid);
        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {
          const data = snapshot.data();
          setFormData({
            name: data.name ?? "",
            lastname: data.lastname ?? "",
            email: data.email ?? "",
            password: data.password ?? "",
            age: String(data.age ?? ""),
            gender: String(data.gender ?? ""),
          });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [uid]);

  // 🔹 input handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 save profile
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uid) return;

    try {
      const docRef = doc(db, "users", uid);
      await updateDoc(docRef, {
        ...formData,
        age: Number(formData.age),
      });
      router.push("/dashbord");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Something went wrong ❌");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading/>
      </div>
    );
  }
  console.log(formData);
  
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >
        <h1 className="text-3xl font-bold text-center text-orange-500">
          My Profile
        </h1>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="First Name"
          className="w-full border p-3 rounded"
        />

        <input
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          placeholder="Last Name"
          className="w-full border p-3 rounded"
        />

        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-3 rounded"
        />

        <input
          name="password"
          type="text"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full border p-3 rounded"
        />

        <input
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
          className="w-full border p-3 rounded"
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="">Select Gender</option>
          <option value="true">Male</option>
          <option value="false">Female</option>
        </select>

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded font-bold text-lg transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}