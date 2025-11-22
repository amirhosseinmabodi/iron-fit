"use client";
import React from "react";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useEffect, useState } from "react";
import { getCookie, deleteCookie } from "cookies-next";
import { doc, getDoc } from "firebase/firestore";

async function getReservedclassesByUser(uid: string) {
  const classesRef = collection(db, "classes");
  const q = query(classesRef, where("reservedUsers", "array-contains", uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
function dashbord() {
  const [classes, setclasses] = useState<any[]>([]);
  const [userName, setUserName] = useState<string>("");
  useEffect(() => {
    const uid = getCookie("UID");
    async function getUserName(uid: string) {
      const userRef = await doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        return `${data.name} ${data.lastname}`;
      } else {
        return null;
      }
    }
    async function fetchData() {
      const reserved = await getReservedclassesByUser(uid as string);
      setclasses(reserved);
      const name = await getUserName(uid as string);
      console.log(name);
      if (name) setUserName(name);
    }
    fetchData();
  }, []);
  const logoutHandler = () => {
    deleteCookie("UID");
    window.location.href = "/login";
  };
  async function cancelHandler(classNameId: string, userId: string) {
    try {
      const classNameRef = doc(db, "classes", classNameId);
      await updateDoc(classNameRef, {
        reservedUsers: arrayRemove(userId),
      });
      alert("remove is succesful");
      window.location.reload();
    } catch (error) {
      console.error("error: ", error);
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-4xl text-center font-bold">{userName}</h2>

      <div className="flex min-h-screen gap-4">
        <div className="w-1/4 min-w-[200px] bg-gray-800 text-white p-4">
          <h2 className="text-xl font-semibold mb-4">Dashboard Menu</h2>
          <ul className="space-y-2">
            <li className="hover:bg-gray-700 p-2 rounded">Home</li>
            <li className="hover:bg-gray-700 p-2 rounded">Profile</li>
            <li className="hover:bg-gray-700 p-2 rounded">Settings</li>
            <li
              className="hover:bg-gray-700 p-2 rounded"
              onClick={logoutHandler}
            >
              Logout
            </li>
          </ul>
        </div>
        <div className="flex-1">
          <h3 className="text-3xl font-extrabold p-8 text-gray-800">
            Reserved Classes 🏋🏻‍♂️
          </h3>

          {classes.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              <p className="text-xl">No reserved classes found.</p>
              <p className="text-sm italic mt-2">Maybe time to book one? 😅</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
              {classes.map((cls) => (
                <div
                  key={cls.id}
                  className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div className="mb-4">
                    <h3 className="text-center text-3xl font-bold text-orange-600 mb-3">
                      {cls.name}
                    </h3>
                    <p className="text-center text-gray-600 font-semibold">
                      {cls.date?.toDate().toLocaleString()}
                    </p>
                  </div>

                  <div className="text-center text-gray-700 mb-6">
                    <p>
                      <span className="font-bold">Coach:</span> {cls.coach}
                    </p>
                    <p>
                      <span className="font-bold">Price:</span> {cls.price}$
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      cancelHandler(cls.id, getCookie("UID") as string)
                    }
                    className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg text-lg transition-colors"
                  >
                    Cancel Reservation
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default dashbord;
