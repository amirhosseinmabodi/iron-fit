"use client";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { db } from "../../../../lib/firebase";
import { IGymClass } from "@/context/context";
import { getCookie } from "cookies-next";

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
    console.log('ascascasc',classDetails?.capacity - usersCount);
    
    if (reservedUsers.includes(userId)) {
      console.warn("این کاربر قبلاً رزرو کرده!");
      return;
    }else if (reservedUsers.length < (classDetails?.capacity - usersCount)) {
      console.warn("ظرفیت تکمیل");
      return;
    }else{
      await updateDoc(classref, { reservedUsers: arrayUnion(userId) });
    }
  };
  const usersCount = classDetails?.reservedUsers?.length || 0;
  return (
    <div>
      <img src={classDetails?.image} alt={classDetails?.name} />
      <h1>{classDetails?.name}</h1>
      <p>coach: {classDetails?.coach}</p>
      <p>price:{classDetails?.price}</p>
      <p>capacity:{(classDetails?.capacity as number) - usersCount}</p>
      <p>duration:{classDetails?.duration}min</p>
      <button
        onClick={() => handleBooking(classDetails?.id as string, uid)}
      >
        booking
      </button>
    </div>
  );
}

export default classDetails;
