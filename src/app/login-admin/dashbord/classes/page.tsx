"use client";
import { usecontext, IGymClass } from "@/context/context";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { db } from "../../../../../lib/firebase";
import edit from "./[id]/page";
import { useRouter } from "next/navigation";

function classes() {
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
      <div>
        {classes.map((cls: IGymClass) => (
          <div key={cls.id} className="p-4 flex gap-4">
            <h3>{cls.name}</h3>
            <p>{cls.description}</p>
            <h3>{cls.coach}</h3>
            <h3>{cls.price}</h3>
            <div className="flex gap-4">
              <button onClick={() => editHandler(cls.id as string)}>edit</button>
              <button onClick={() => deleteHandler(cls.id as string)}>
                delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default classes;
