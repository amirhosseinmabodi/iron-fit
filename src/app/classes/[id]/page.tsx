"use client";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { db } from "../../../../lib/firebase";
import { IGymclassName } from "@/context/context";
import { getCookie } from "cookies-next";
import Loading from "@/app/components/Loading";
import { useRouter } from "next/navigation";

function ClassNameDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [classNameDetails, setclassNameDetails] =
    useState<IGymclassName | null>(null);
  const [isBooked, setIsBooked] = useState(false);
  const [logerror, setLogerror] = useState("");
  const uid = getCookie("UID") as string | undefined;

  /* ---------- MODAL STATE ---------- */
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"error" | "success">("success");

  const showModal = (message: string, type: "error" | "success") => {
    setModalMessage(message);
    setModalType(type);
    setModalOpen(true);
  };

  const usersCount = classNameDetails?.reservedUsers?.length || 0;

  useEffect(() => {
    if (!id) return;

    const fetchclassName = async () => {
      try {
        const docref = doc(db, "classes", id as string);
        const snapshot = await getDoc(docref);

        if (snapshot.exists()) {
          const data = snapshot.data() as IGymclassName;
          setclassNameDetails({ id: snapshot.id, ...data });

          const reservedUsers = data.reservedUsers || [];
          if (
            reservedUsers.includes(uid) ||
            reservedUsers.length >= (data.capacity ?? 0)
          ) {
            setIsBooked(true);
          }
        } else {
          setLogerror("Can't find class");
        }
      } catch (error) {
        console.error(error);
        setLogerror("Something went wrong!");
      }
    };

    fetchclassName();
  }, [id, uid]);

  const handleBooking = async (classNameId: string, userId: string) => {
    if (!userId) {
      showModal("Please login first to book this class.", "error");
      return;
    }
    const classNameref = doc(db, "classes", classNameId);
    const snapshot = await getDoc(classNameref);

    if (!snapshot.exists()) {
      showModal("Class not found!", "error");
      return;
    }

    const data = snapshot.data();
    const reservedUsers = data.reservedUsers || [];

    if (reservedUsers.includes(userId)) {
      setIsBooked(true);
      showModal("You have already booked this class.", "error");
      return;
    }

    if (reservedUsers.length >= (classNameDetails?.capacity ?? 0)) {
      setIsBooked(true);
      showModal("Class capacity is full.", "error");
      return;
    }

    await updateDoc(classNameref, {
      reservedUsers: arrayUnion(userId),
    });

    setIsBooked(true);
    showModal("Class booked successfully 🎉", "success");
  };

  if (logerror) return <p className="text-center text-red-500">{logerror}</p>;

  if (!classNameDetails)
    return (
      <div className="flex justify-center items-center py-20">
        <Loading />
      </div>
    );

  return (
    <>
      {/* ---------- MODAL ---------- */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm text-center">
            <h2
              className={`text-xl font-bold mb-3 ${
                modalType === "error" ? "text-red-500" : "text-green-500"
              }`}
            >
              {modalType === "error" ? "Oops!" : "Success"}
            </h2>

            <p className="text-gray-600 mb-6">{modalMessage}</p>

            <button
              onClick={() => {
                setModalOpen(false);

                if (!uid) {
                  router.push("/login");
                }
              }}
              className={`w-full py-2 rounded-lg text-white font-semibold ${
                modalType === "error"
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* ---------- PAGE ---------- */}
      <div>
        <div
          className="p-16 flex justify-center items-center flex-col h-96 text-center text-white"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.4)), url(${classNameDetails.image})`,
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        >
          <h1 className="font-bold text-4xl">{classNameDetails.name}</h1>
          <p className="text-sm pt-4">with {classNameDetails.coach}</p>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 p-8 gap-12">
          <div className="col-span-2 shadow-xl rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">Class Information</h2>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <p className="text-gray-500">Duration</p>
                <p>{classNameDetails.duration} minutes</p>
              </div>

              <div>
                <p className="text-gray-500">Date</p>
                <p>
                  {classNameDetails.date.toDate().toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Reserved</p>
                <p>
                  {usersCount}/{classNameDetails.capacity}
                </p>
              </div>
            </div>

            <p className="text-gray-700">{classNameDetails.description}</p>
          </div>

          <div className="shadow-xl rounded-xl p-8 flex flex-col items-center gap-6">
            <p className="text-5xl font-extrabold text-orange-500">
              ${classNameDetails.price}
            </p>

            <p className="text-lg">
              Capacity left: {(classNameDetails.capacity ?? 0) - usersCount}
            </p>

            <button
              disabled={isBooked}
              onClick={() => handleBooking(classNameDetails.id as string, uid)}
              className={`w-full h-14 rounded-xl text-white font-bold text-xl transition ${
                isBooked
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              {isBooked ? "Booked" : "Book now"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClassNameDetails;
