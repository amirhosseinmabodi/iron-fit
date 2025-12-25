"use client";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { db } from "../../../../lib/firebase";
import { IGymclassName } from "@/context/context";
import { getCookie } from "cookies-next";
import Loading from "@/app/components/Loading";

function ClassNameDetails() {
  const { id } = useParams();
  const [classNameDetails, setclassNameDetails] = useState<IGymclassName | null>(null);
  const [isBooked, setIsBooked] = useState(false);
  const [logerror, setLogerror] = useState("");
  const uid = String(getCookie("UID"));

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
          setLogerror("cant find class");
        }
      } catch (error) {
        console.error("some things wrong!", error);
        setLogerror("some things wrong!");
      }
    };

    fetchclassName();
  }, [id, uid]);

  const handleBooking = async (classNameId: string, userId: string) => {
    const classNameref = doc(db, "classes", classNameId);
    const snapshot = await getDoc(classNameref);

    if (!snapshot.exists()) {
      console.error("cant find class");
      return;
    }

    const data = snapshot.data();
    const reservedUsers = data.reservedUsers || [];

    if (reservedUsers.includes(userId)) {
      console.warn("این کاربر قبلاً رزرو کرده!");
      setIsBooked(true);
      return;
    } else if (reservedUsers.length >= (classNameDetails?.capacity ?? 0)) {
      console.warn("ظرفیت تکمیل");
      setIsBooked(true);
      return;
    } else {
      await updateDoc(classNameref, { reservedUsers: arrayUnion(userId) });
      setIsBooked(true);
    }
  };

  if (logerror) return <p className="text-center text-red-500">{logerror}</p>;
  if (!classNameDetails)
    return (
      <div className="flex justify-center items-center py-20">
         <Loading />
      </div>
    );

  return (
    <div>
      <div
        className="p-16 flex justify-center items-center flex-col h-96 text-center text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${classNameDetails.image})`,
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="font-bold text-4xl">{classNameDetails.name}</h1>
        <p className="text-sm pt-4">with {classNameDetails.coach}</p>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 p-8 gap-12 justify-center items-center">
        <div className="col-span-2 shadow-xl rounded-xl p-8">
          <h2 className="text-2xl font-bold">Class Information</h2>
          <div className="grid grid-cols-2 my-4">
            <div>
              <p>Duration</p>
              <p>{classNameDetails.duration} minutes</p>
            </div>
            <div>
              <p>Reserved</p>
              <p>
                {classNameDetails.reservedUsers?.length ?? 0}/
                {classNameDetails.capacity ?? 0}
              </p>
            </div>
          </div>
          <p>{classNameDetails.description}</p>
        </div>

        <div>
          <div className="shadow-xl rounded-xl md:col-start-2 p-8 flex flex-col justify-center items-center gap-8">
            <p className="font-bold md:text-7xl text-4xl text-orange-500">
              ${classNameDetails.price}
            </p>
            <p className="text-2xl">
              Capacity left: {(classNameDetails.capacity ?? 0) - usersCount}
            </p>
            <button
              disabled={isBooked}
              className={`w-full h-16 rounded text-white font-bold text-2xl ${
                isBooked ? "bg-gray-400" : "bg-orange-500"
              }`}
              onClick={() => handleBooking(classNameDetails.id as string, uid)}
            >
              {isBooked ? "Booked" : "Book now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassNameDetails;
