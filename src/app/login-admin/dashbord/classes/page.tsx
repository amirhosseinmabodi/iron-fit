"use client";

import { usecontext, IGymClass } from "@/context/context";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../../lib/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "classes"), {
        ...formData,
        date: new Date(formData.date),
        duration: Number(formData.duration),
        capacity: Number(formData.capacity),
        price: Number(formData.price),
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
    if (!confirm("Are you sure you want to delete?")) return;
    try {
      await deleteDoc(doc(db, "classes", id));
      alert("Deleted!");
      location.reload();
    } catch (err) {
      alert("Delete failed!");
    }
  };

  const editHandler = (id: string) => {
    router.push(`classes/${id}`);
  };

  return (
    <div className="p-6">

      {/* BACK BUTTON */}
      <button
        onClick={() => router.push('/login-admin/dashbord')}
        className="flex items-center gap-2 text-gray-700 hover:text-black mb-6"
      >
        <span className="text-lg font-medium">Back</span>
      </button>

      {/* FORM CARD */}
      <form
        onSubmit={handleSubmit}
        className="p-5 bg-orange-500 shadow-lg rounded-xl max-w-lg mx-auto space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center mb-2 text-white">Create Class</h2>

        <input
          type="text"
          name="name"
          placeholder="Class Name"
          value={formData.name}
          onChange={handleChange}
          className=" border-gray-500 bg-white outline-0 shadow-xl p-2 rounded w-full"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border-gray-500 bg-white outline-0 shadow-xl p-2 rounded w-full"
        />

        <input
          type="text"
          name="coach"
          placeholder="Coach Name"
          value={formData.coach}
          onChange={handleChange}
          className="border-gray-500 bg-white outline-0 shadow-xl p-2 rounded w-full"
        />

        <input
          type="datetime-local"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="border-gray-500 bg-white outline-0 shadow-xl p-2 rounded w-full"
        />

        <div className="flex gap-3">
          <input
            type="number"
            name="duration"
            placeholder="Duration (min)"
            value={formData.duration}
            onChange={handleChange}
            className="border-gray-500 outline-0 bg-white shadow-xl p-2 rounded w-full"
          />
          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            value={formData.capacity}
            onChange={handleChange}
            className="border-gray-500 bg-white outline-0 shadow-xl p-2 rounded w-full"
          />
        </div>

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="border-gray-500 bg-white outline-0 shadow-xl p-2 rounded w-full"
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="border-gray-500 bg-white outline-0 shadow-xl p-2 rounded w-full"
        />

        <button className="bg-blue-600 cursor-pointer text-white w-full py-2 rounded-lg hover:bg-blue-700 transition">
          Save Class
        </button>
      </form>

      {/* CLASSES TABLE */}
      <div className="mt-10 overflow-auto">
        <table className="w-full text-sm border shadow-md rounded-lg overflow-hidden">
          <thead className="bg-orange-500 text-center text-white">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Coach</th>
              <th className="p-3">Date</th>
              <th className="p-3">Time</th>
              <th className="p-3">Price</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {classes.map((cls: IGymClass) => (
              <tr key={cls.id} className="border-b text-center hover:bg-gray-50">

                <td className="p-2">
                  <img
                    src={cls.image}
                    className="w-14 h-14 object-cover rounded"
                  />
                </td>

                <td className="p-2 font-medium">{cls.name}</td>

                <td className="p-2">{cls.coach}</td>

                <td className="p-2">
                  {cls.date?.seconds
                    ? new Date(cls.date.seconds * 1000).toLocaleDateString("en-US")
                    : "Invalid"}
                </td>

                <td className="p-2">
                  {cls.date?.seconds
                    ? new Date(cls.date.seconds * 1000).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Invalid"}
                </td>

                <td className="p-2">${cls.price}</td>

                <td className="p-2 flex justify-center gap-2">
                  <button
                    onClick={() => editHandler(cls.id as string)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteHandler(cls.id as string)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
  );
}

export default ClassesList;
