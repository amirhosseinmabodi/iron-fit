"use client";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { db } from "../../../../lib/firebase";
import { IGymClass } from "@/context/context";
import { getCookie } from "cookies-next";
import { url } from "inspector";

function classDetails() {
  const { id } = useParams();
  const [classDetails, setclassDetails] = useState<IGymClass | null>(null);
  const uid = String(getCookie("UID"));
  console.log("UID:", uid);
  useEffect(() => {
    if (!id) return;
    const fetchclass = async () => {
      console.log("Fetching class:", id);
      const docref = doc(db, "classes", id as string);
      const snapshot = await getDoc(docref);
      console.log("Exists?", snapshot.exists());
      console.log("Data:", snapshot.data());
      try {
        const docref = doc(db, "classes", id as string);
        const snapshot = await getDoc(docref);
        if (snapshot.exists()) {
          setclassDetails({ id: snapshot.id, ...snapshot.data() } as IGymClass);
        } else {
          console.warn("کلاسی با این آیدی پیدا نشد!");
        }
      } catch (error) {
        console.error("خطا در دریافت اطلاعات کلاس:", error);
      }
    };
    fetchclass();
  }, [id]);
  const handleBooking = async (classId: string, userId: string) => {
    const classref = doc(db, "classes", classId);
    const snapshot = await getDoc(classref);
    if (!snapshot.exists()) {
      console.error("کلاسی یافت نشد");
      return;
    }

    const data = snapshot.data();
    const reservedUsers = data.reservedUsers || [];
    console.log("ascascasc", classDetails?.capacity - usersCount);

    if (reservedUsers.includes(userId)) {
      console.warn("این کاربر قبلاً رزرو کرده!");
      return;
    } else if (reservedUsers.length < classDetails?.capacity - usersCount) {
      console.warn("ظرفیت تکمیل");
      return;
    } else {
      await updateDoc(classref, { reservedUsers: arrayUnion(userId) });
    }
  };
  const usersCount = classDetails?.reservedUsers?.length || 0;
  return (
    <div>
      <div
        className="p-16 flex justify-center items-center flex-col h-96 text-center text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${classDetails?.image})`,
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="font-bold text-4xl">{classDetails?.name}</h1>
        <p className="text-sm pt-4">with {classDetails?.coach}</p>
      </div>
      <div className="grid grid-cols-3 p-8 gap-12 justify-center items-center">
        <div className="col-span-2 shadow-xl rounded-xl p-8">
          <h2 className="text-2xl font-bold">Class Information</h2>
          <div className="grid grid-cols-2 my-4">
            <div>
              <p>Duration</p>
              <p>{classDetails?.duration} minutes</p>
            </div>
            <div>
              <p>Schedule</p>
              <p>
                {classDetails?.reservedUsers?.length ?? 0}/
                {classDetails?.capacity ?? 0}
              </p>
            </div>
          </div>
          <p>{classDetails?.description}</p>
        </div>
        <div>
          <div className="shadow-xl rounded-xl p-8 flex flex-col justify-center items-center gap-8">
            <p className="font-bold text-7xl text-orange-500">${classDetails?.price}</p>
            <p className="text-2xl">capacity:{(classDetails?.capacity as number) - usersCount}</p>
            <button
            className="w-full bg-orange-500 h-16 rounded text-white font-bold text-2xl"
              onClick={() => handleBooking(classDetails?.id as string, uid)}
            >
              booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default classDetails;
