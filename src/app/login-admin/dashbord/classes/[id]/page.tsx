"use client";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { db } from "../../../../../../lib/firebase";
import { useRouter } from "next/navigation";

function edit() {
  const { id } = useParams();
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchclassName = async () => {
      if (!id) {
        return;
      }
      try {
        const docref = doc(db, "classes", id as string);
        const snapshot = await getDoc(docref);
        if (snapshot.exists()) {
          const data = snapshot.data();
          setFormData({
            name: data.name || "",
            description: data.description || "",
            coach: data.coach || "",
            date: new Date(data.date.seconds * 1000).toISOString().slice(0, 16),
            duration: String(data.duration || ""),
            capacity: String(data.capacity || ""),
            price: String(data.price || ""),
            image: data.image || "",
          });
        } else {
          alert("className not found!");
          router.push("/admin/classes");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchclassName();
  }, []);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    try {
      const docRef = doc(db, "classes", id as string);
      await updateDoc(docRef, {
        ...formData,
        date: new Date(formData.date),
        duration: Number(formData.duration),
        capacity: Number(formData.capacity),
        price: Number(formData.price),
      });
      alert("className updated!");
      window.location.href = "/login-admin/dashbord/classes";
    } catch (err) {
      console.error("Update failed:", err);
    }
  }

  return (
    <form
      onSubmit={handleUpdate}
      className="p-4 space-y-4 max-w-md mx-auto shadow-lg"
    >
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="className Name"
        className="border p-2 w-full"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="border p-2 w-full"
      />
      <input
        name="coach"
        value={formData.coach}
        onChange={handleChange}
        placeholder="Coach"
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
        value={formData.duration}
        onChange={handleChange}
        placeholder="Duration"
        className="border p-2 w-full"
      />
      <input
        type="number"
        name="capacity"
        value={formData.capacity}
        onChange={handleChange}
        placeholder="Capacity"
        className="border p-2 w-full"
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        className="border p-2 w-full"
      />
      <input
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="Image URL"
        className="border p-2 w-full"
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Update className
      </button>
    </form>
  );
}

export default edit;
