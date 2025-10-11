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
      <button
        className="bg-red-500 py-2 px-4 text-white font-bold text-xl capitalize float-end rounded-full"
        onClick={logoutHandler}
      >
        logout
      </button>
      <h2 className="text-4xl text-center font-bold">{userName}</h2>
      <h3 className="p-8 text-2xl">reserved className</h3>
      {classes.length === 0 ? (
        <p>there is no reserved className</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {classes.map((cls) => (
            <div
              key={cls.id}
              className="p-8 text-white bg-orange-500 rounded-lg"
            >
              <div className="text-center p-4">
                <h3 className="text-4xl font-extrabold mb-3">{cls.name}</h3>
                <p className="font-bold">
                  {cls.date?.toDate().toLocaleString()}
                </p>
              </div>
              <p className="text-center">
                coach: {cls.coach} | price: {cls.price}
                <hr className="my-4" />
              </p>
              <button
                onClick={() =>
                  cancelHandler(cls.id, getCookie("UID") as string)
                }
                className="w-full h-16 bg-red-600 rounded-full text-3xl font-bold cursor-pointer"
              >
                cancel
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default dashbord;
