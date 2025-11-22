"use client";
import { usecontext, IGymClass } from "@/context/context";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { db } from "../../../../../lib/firebase";
import edit from "./[id]/page";
import { useRouter } from "next/navigation";

function ClassesList() {
  const { classes } = usecontext();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    coach: "",
    date: "",
    duration: "",
    capacity: "",
    price: "",
    image: "",
  });
  console.log(classes);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "classes"), {
        name: formData.name,
        description: formData.description,
        coach: formData.coach,
        date: new Date(formData.date),
        duration: Number(formData.duration),
        capacity: Number(formData.capacity),
        price: Number(formData.price),
        image: formData.image,
        reservedUsers: [],
      });
      alert("Class added successfully!");
      setFormData({
        name: "",
        description: "",
        coach: "",
        date: "",
        duration: "",
        capacity: "",
        price: "",
        image: "",
      });
    } catch (err) {
      console.error("Error adding class:", err);
    }
  };
  const deleteHandler = async (id: string) => {
    if (!confirm("are you sure want delete?")) return;
    try {
      await deleteDoc(doc(db, "classes", id));
      alert("successful!");
      location.reload();
    } catch (error) {
      console.error("error:", error);
      alert("delete failed!");
    }
  };
  const editHandler = (id: string) => {
    router.push(`classes/${id}`);
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="p-4 space-y-4 shadow-lg max-w-md mx-auto"
      >
        <input
          type="text"
          name="name"
          placeholder="Class Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="coach"
          placeholder="Coach Name"
          value={formData.coach}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="datetime-local"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="number"
          name="duration"
          placeholder="Duration (min)"
          value={formData.duration}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={formData.capacity}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save Class
        </button>
      </form>
      <div className="my-8">
        <div className="overflow-x-auto mt-10">
          <table className="min-w-full border border-gray-300 text-left rounded-lg overflow-hidden shadow-md">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="py-3 px-4">Image</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Coach</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Duration (min)</th>
                <th className="py-3 px-4">Capacity</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls: IGymClass) => (
                <tr
                  key={cls.id}
                  className="border-t hover:bg-orange-50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <img
                      src={cls.image}
                      alt={cls.name}
                      className="w-16 h-16 object-cover rounded-md border"
                    />
                  </td>
                  <td className="py-3 px-4 font-semibold">{cls.name}</td>
                  <td className="py-3 px-4 text-gray-600">{cls.description}</td>
                  <td className="py-3 px-4">{cls.coach}</td>
                  <td className="py-3 px-4">
                    {new Date(cls.date).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="py-3 px-4">{cls.duration} min</td>
                  <td className="py-3 px-4">{cls.capacity}</td>
                  <td className="py-3 px-4">${cls.price}</td>
                  <td className="py-3 px-4 flex justify-center gap-3">
                    <button
                      onClick={() => editHandler(cls.id as string)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteHandler(cls.id as string)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ClassesList;
