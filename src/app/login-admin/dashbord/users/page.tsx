"use client";
import { usecontext, IGymusers } from "@/context/context";
import { deleteDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../../../../lib/firebase";
import { useRouter } from "next/navigation";

function users() {
  const { users } = usecontext();
  const router = useRouter()
  console.log(users);
  const deleteHandler = async (id: string) => {
    if (!confirm("are you sure want delete?")) return;
    try {
      await deleteDoc(doc(db, "users", id));
      alert("successful!");
      location.reload();
    } catch (error) {
      console.error("error:", error);
      alert("delete failed!");
    }
  };
  const editHandler = (id: string) => {
    router.push(`users/${id}`);
  };
  return (
    <div className="flex justify-center items-center p-36">
      <table className="border-2 rounded">
        <thead className="bg-orange-500 text-white">
          <tr>
            <th className="px-4 py-2 border">id</th>
            <th className="px-4 py-2 border">name</th>
            <th className="px-4 py-2 border">last name</th>
            <th className="px-4 py-2 border">email</th>
            <th className="px-4 py-2 border">password</th>
            <th className="px-4 py-2 border">age</th>
            <th className="px-4 py-2 border">gender</th>
            <th className="px-4 py-2 border">action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((urs: IGymusers) => (
            <tr key={urs.uid}>
              <td className="px-4 py-2 border">{urs?.uid}</td>
              <td className="px-4 py-2 border">{urs?.name}</td>
              <td className="px-4 py-2 border">{urs?.lastname}</td>
              <td className="px-4 py-2 border">{urs?.email}</td>
              <td className="px-4 py-2 border">{urs?.password}</td>
              <td className="px-4 py-2 border">{urs?.age}</td>
              <td className="px-4 py-2 border">
                {urs?.gender ? "male" : "female"}
              </td>
              <td className="px-4 py-2 border">
                <button onClick={() => editHandler(urs.uid as string)}>
                  edit
                </button>
                /
                <button onClick={() => deleteHandler(urs.uid as string)}>
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default users;
