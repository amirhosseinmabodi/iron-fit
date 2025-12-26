"use client";

import { usecontext, IGymClass } from "@/context/context";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../../lib/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ClassesList() {
  const { classes } = usecontext();
  const router = useRouter();

  const [successModal, setSuccessModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

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

  const handleChange = (e: any) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await addDoc(collection(db, "classes"), {
      ...formData,
      date: new Date(formData.date),
      duration: +formData.duration,
      capacity: +formData.capacity,
      price: +formData.price,
      reservedUsers: [],
    });

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

    setSuccessModal(true);
    window.location.reload()
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    await deleteDoc(doc(db, "classes", deleteId));
    setDeleteId(null);
    location.reload();
  };

  return (
    <>
      <div className="p-8 space-y-12 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-orange-500">
            Classes Management
          </h1>
          <button
            onClick={() => router.push("/login-admin/dashbord")}
            className="px-4 py-2 rounded-lg border border-orange-500 text-orange-500
                     hover:bg-orange-500 hover:text-white transition"
          >
            ← Dashboard
          </button>
        </div>

        {/* Create Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto space-y-6"
        >
          <h2 className="text-xl font-bold text-gray-700 text-center">
            Create New Class
          </h2>

          <Input
            label="Class Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <Textarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <Input
            label="Coach"
            name="coach"
            value={formData.coach}
            onChange={handleChange}
          />
          <Input
            type="datetime-local"
            label="Date & Time"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              type="number"
              label="Duration (min)"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
            />
            <Input
              type="number"
              label="Capacity"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
            />
            <Input
              type="number"
              label="Price ($)"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <Input
            label="Image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />

          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition">
            Save Class
          </button>
        </form>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="p-4">Image</th>
                <th>Name</th>
                <th>Coach</th>
                <th>Date</th>
                <th>Time</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody className="text-center">
              {classes.map((cls: IGymClass) => (
                <tr
                  key={cls.id}
                  className="border-b hover:bg-orange-50 transition"
                >
                  <td className="p-3">
                    <img
                      src={cls.image}
                      className="w-14 h-14 rounded-lg object-cover mx-auto"
                    />
                  </td>
                  <td className="font-medium">{cls.name}</td>
                  <td>{cls.coach}</td>
                  <td>
                    {new Date(cls.date.seconds * 1000).toLocaleDateString()}
                  </td>
                  <td>
                    {new Date(cls.date.seconds * 1000).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="font-semibold text-orange-500">
                    ${cls.price}
                  </td>
                  <td className="flex justify-center gap-2 p-3">
                    <button
                      onClick={() => router.push(`classes/${cls.id}`)}
                      className="px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteId(cls.id as string)}
                      className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
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

      {/* Success Modal */}
      <Modal open={successModal}>
        <h3 className="text-2xl font-bold text-orange-500 mb-2">
          Class Created 🎉
        </h3>
        <p className="text-gray-600 mb-6">
          Your class has been added successfully.
        </p>
        <button
          onClick={() => setSuccessModal(false)}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-xl font-semibold"
        >
          Done
        </button>
      </Modal>

      {/* Delete Modal */}
      <Modal open={!!deleteId}>
        <h3 className="text-xl font-bold text-red-500 mb-2">Delete Class</h3>
        <p className="text-gray-600 mb-6">This action cannot be undone.</p>
        <div className="flex gap-3">
          <button
            onClick={() => setDeleteId(null)}
            className="w-full border rounded-xl py-2"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="w-full bg-red-500 hover:bg-red-600 text-white rounded-xl py-2"
          >
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
}

/* ---------- UI Components ---------- */

function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="block text-sm text-gray-500 mb-1">{label}</label>
      <input
        {...props}
        className="w-full border rounded-xl p-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
      />
    </div>
  );
}

function Textarea({ label, ...props }: any) {
  return (
    <div>
      <label className="block text-sm text-gray-500 mb-1">{label}</label>
      <textarea
        {...props}
        rows={4}
        className="w-full border rounded-xl p-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 resize-none transition"
      />
    </div>
  );
}

function Modal({ open, children }: any) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-md animate-fade-in">
        {children}
      </div>
    </div>
  );
}
