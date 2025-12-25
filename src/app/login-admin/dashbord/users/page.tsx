"use client";

import { usecontext, IGymusers } from "@/context/context";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../../lib/firebase";
import { useRouter } from "next/navigation";

export default function Users() {
  const { users } = usecontext();
  const router = useRouter();

  const deleteHandler = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    await deleteDoc(doc(db, "users", id));
    location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-black text-orange-500">
            Users Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage all registered gym users
          </p>
        </div>

        <button
          onClick={() => router.push("/login-admin/dashbord")}
          className="px-4 py-2 rounded-lg border border-orange-500 text-orange-500
                     hover:bg-orange-500 hover:text-white transition"
        >
          ← Dashboard
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="px-6 py-4 text-left">UID</th>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Last Name</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Age</th>
              <th className="px-6 py-4 text-left">Gender</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user: IGymusers) => (
              <tr
                key={user.uid}
                className="border-b last:border-none hover:bg-orange-50 transition"
              >
                <td className="px-6 py-4 text-xs text-gray-400">
                  {user.uid}
                </td>

                <td className="px-6 py-4 font-semibold">
                  {user.name}
                </td>

                <td className="px-6 py-4">
                  {user.lastname}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {user.email}
                </td>

                <td className="px-6 py-4">
                  {user.age}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-4 py-1 rounded-full text-xs font-bold
                      ${
                        user.gender
                          ? "bg-blue-100 text-blue-600"
                          : "bg-pink-100 text-pink-600"
                      }`}
                  >
                    {user.gender ? "Male" : "Female"}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => router.push(`users/${user.uid}`)}
                      className="px-4 py-1.5 rounded-lg bg-blue-500 text-white
                                 hover:bg-blue-600 transition shadow"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteHandler(user.uid as string)}
                      className="px-4 py-1.5 rounded-lg bg-red-500 text-white
                                 hover:bg-red-600 transition shadow"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {users.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-gray-400 text-lg">
              No users found 👤
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
