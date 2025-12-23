"use client";

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { db } from "../../../../../../lib/firebase";

function EditUser() {
  const { id } = useParams();

  const [fdata, setFdata] = useState({
    age: "",
    email: "",
    gender: "",
    lastname: "",
    name: "",
    password: "",
    uid: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFdata((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;

      try {
        const docRef = doc(db, "users", id as string);
        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {
          const data = snapshot.data();
          setFdata({
            age: String(data.age),
            email: data.email,
            gender: data.gender,
            lastname: data.lastname,
            name: data.name,
            password: data.password,
            uid: data.uid,
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const docRef = doc(db, "users", id as string);
      await updateDoc(docRef, {
        ...fdata,
        age: Number(fdata.age),
      });

      alert("User updated successfully ✅");
      window.location.href = "/login-admin/dashbord/users";
    } catch (error) {
      console.error(error);
      alert("Update failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <form
        onSubmit={handleUpdate}
        className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-xl space-y-5"
      >
        <h1 className="text-3xl font-bold text-center text-orange-500">
          Edit User Profile
        </h1>

        <div className="grid grid-cols-2 gap-4">
          <input
            name="name"
            value={fdata.name}
            onChange={handleChange}
            placeholder="First Name"
            className="border p-3 rounded-lg focus:outline-orange-500"
          />

          <input
            name="lastname"
            value={fdata.lastname}
            onChange={handleChange}
            placeholder="Last Name"
            className="border p-3 rounded-lg focus:outline-orange-500"
          />
        </div>

        <input
          name="email"
          type="email"
          value={fdata.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-3 rounded-lg focus:outline-orange-500"
        />

        <input
          name="password"
          type="text"
          value={fdata.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full border p-3 rounded-lg focus:outline-orange-500"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            name="age"
            type="number"
            value={fdata.age}
            onChange={handleChange}
            placeholder="Age"
            className="border p-3 rounded-lg focus:outline-orange-500"
          />

          <select
            name="gender"
            value={fdata.gender}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:outline-orange-500"
          >
            <option value="">Gender</option>
            <option value="true">Male</option>
            <option value="false">Female</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-bold text-lg transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditUser;
