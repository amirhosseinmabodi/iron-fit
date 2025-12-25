"use client";

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { db } from "../../../../../../lib/firebase";

export default function EditClass() {
  const { id } = useParams();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

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
    if (!id) return;

    const fetchClass = async () => {
      const docRef = doc(db, "classes", id as string);
      const snapshot = await getDoc(docRef);

      if (!snapshot.exists()) {
        router.push("/login-admin/dashbord/classes");
        return;
      }

      const data = snapshot.data();
      setFormData({
        name: data.name ?? "",
        description: data.description ?? "",
        coach: data.coach ?? "",
        date: new Date(data.date.seconds * 1000)
          .toISOString()
          .slice(0, 16),
        duration: String(data.duration ?? ""),
        capacity: String(data.capacity ?? ""),
        price: String(data.price ?? ""),
        image: data.image ?? "",
      });
    };

    fetchClass();
  }, [id, router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const docRef = doc(db, "classes", id as string);

    await updateDoc(docRef, {
      ...formData,
      date: new Date(formData.date),
      duration: Number(formData.duration),
      capacity: Number(formData.capacity),
      price: Number(formData.price),
    });

    setIsModalOpen(true);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-extrabold text-orange-500">
              Edit Class
            </h1>
            <button
              onClick={() => router.back()}
              className="text-sm text-gray-500 hover:text-orange-500 transition"
            >
              ← Back
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleUpdate} className="space-y-5">
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

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold text-lg transition"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen}>
        <h2 className="text-2xl font-bold text-orange-500 mb-2">
          Class Updated ✅
        </h2>
        <p className="text-gray-600 mb-6">
          The class information has been saved successfully.
        </p>

        <button
          onClick={() =>
            router.push("/login-admin/dashbord/classes")
          }
          className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
        >
          Go to Classes
        </button>
      </Modal>
    </>
  );
}

/* ---------- Small reusable components ---------- */

function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <input
        {...props}
        className="w-full border rounded-lg p-3 outline-none
        focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
      />
    </div>
  );
}

function Textarea({ label, ...props }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <textarea
        {...props}
        rows={4}
        className="w-full border rounded-lg p-3 outline-none
        focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition resize-none"
      />
    </div>
  );
}

function Modal({ isOpen, children }: any) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl animate-fadeIn">
        {children}
      </div>
    </div>
  );
}
