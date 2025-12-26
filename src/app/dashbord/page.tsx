"use client";
import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  arrayRemove,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { getCookie, deleteCookie } from "cookies-next";
import Loading from "../components/Loading";

/* ---------- HELPERS ---------- */
async function getReservedClassesByUser(uid: string) {
  const classesRef = collection(db, "classes");
  const q = query(classesRef, where("reservedUsers", "array-contains", uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

function Dashboard() {
  const [classes, setClasses] = useState<any[]>([]);
  const [userName, setUserName] = useState("");

  /* ---------- MODAL STATE ---------- */
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"success" | "error">("success");

  const showModal = (msg: string, type: "success" | "error") => {
    setModalMessage(msg);
    setModalType(type);
    setModalOpen(true);
  };

  useEffect(() => {
    const uid = getCookie("UID") as string;

    if (!uid) {
      window.location.href = "/login";
      return;
    }

    async function fetchData() {
      const reserved = await getReservedClassesByUser(uid);
      setClasses(reserved);

      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        setUserName(`${data.name} ${data.lastname}`);
      }
    }

    fetchData();
  }, []);

  const logoutHandler = () => {
    deleteCookie("UID");
    window.location.href = "/login";
  };

  async function cancelHandler(classId: string) {
    try {
      const uid = getCookie("UID") as string;
      const classRef = doc(db, "classes", classId);

      await updateDoc(classRef, {
        reservedUsers: arrayRemove(uid),
      });

      setClasses((prev) => prev.filter((c) => c.id !== classId));
      showModal("Reservation cancelled successfully ✅", "success");
    } catch (error) {
      showModal("Failed to cancel reservation ❌", "error");
    }
  }

  return (
    <>
      {/* ---------- MODAL ---------- */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm text-center">
            <h2
              className={`text-xl font-bold mb-3 ${
                modalType === "success"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {modalType === "success" ? "Done" : "Error"}
            </h2>

            <p className="text-gray-600 mb-6">{modalMessage}</p>

            <button
              onClick={() => setModalOpen(false)}
              className="w-full py-2 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* ---------- DASHBOARD ---------- */}
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow p-6 text-center">
          <h2 className="text-3xl font-extrabold text-gray-800">
            Welcome, {userName}
          </h2>
        </header>

        <div className="flex">
          {/* ---------- SIDEBAR ---------- */}
          <aside className="w-64 bg-gray-900 text-white min-h-screen p-6">
            <h3 className="text-xl font-bold mb-6">Dashboard</h3>
            <ul className="space-y-3">
              <li className="p-3 rounded bg-orange-500">Classes</li>
              <li
                className="p-3 rounded hover:bg-gray-700 cursor-pointer"
                onClick={() => (window.location.href = "/dashbord/profile")}
              >
                Profile
              </li>
              <li
                className="p-3 rounded hover:bg-red-600 cursor-pointer"
                onClick={logoutHandler}
              >
                Logout
              </li>
            </ul>
          </aside>

          {/* ---------- CONTENT ---------- */}
          <main className="flex-1 p-8">
            <h3 className="text-3xl font-bold mb-8 text-gray-800">
              Reserved Classes 🏋️
            </h3>

            {classes.length === 0 ? (
              <div className="text-center text-gray-500 mt-20">
                <p className="text-xl">No reserved classes yet</p>
                <p className="text-sm italic mt-2">
                  Time to break a sweat 💪
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classes.map((cls) => (
                  <div
                    key={cls.id}
                    className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition"
                  >
                    <div>
                      <h4 className="text-2xl font-bold text-orange-500 text-center mb-2">
                        {cls.name}
                      </h4>

                      <p className="text-center text-gray-600 mb-4">
                        {cls.date?.toDate().toLocaleString()}
                      </p>

                      <div className="text-gray-700 space-y-1 text-center">
                        <p>
                          <span className="font-semibold">Coach:</span>{" "}
                          {cls.coach}
                        </p>
                        <p>
                          <span className="font-semibold">Price:</span>{" "}
                          {cls.price}$
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => cancelHandler(cls.id)}
                      className="mt-6 w-full py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition"
                    >
                      Cancel Reservation
                    </button>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
