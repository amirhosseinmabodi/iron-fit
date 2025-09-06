'use client'
import React from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useEffect, useState } from "react";
import { getCookie , deleteCookie } from "cookies-next";
import { doc, getDoc } from "firebase/firestore";

async function getReservedClassesByUser(uid: string) {
  const classesRef = collection(db, "classes");
  const q = query(classesRef, where("reservedUsers", "array-contains", uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}
function dashbord() {
  const [classes, setClasses] = useState<any[]>([]);
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
      const reserved = await getReservedClassesByUser(uid as string);
      setClasses(reserved);
      const name = await getUserName(uid as string);
      console.log(name);
      if (name) setUserName(name);
    }
    fetchData();
  }, []);
  const logoutHandler = () =>{
    deleteCookie('UID')
    window.location.href = "/login";
  }
  return (
    <div className='p-4'>
      <button onClick={logoutHandler}>logout</button>
      <h2>{userName}</h2>
      <h3>reserved class</h3>
      {classes.length === 0 ? (
        <p>there is no reserved class</p>
      ) : (
        <ul>
          {classes.map((cls) => (
            <li key={cls.id} className='p-4'>
              <strong>{cls.name}</strong> - {cls.date?.toDate().toLocaleString()}<br />
              coach: {cls.coach} | capacity: {cls.capacity} 
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default dashbord