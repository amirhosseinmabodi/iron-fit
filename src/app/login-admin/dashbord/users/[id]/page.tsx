"use client";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { db } from "../../../../../../lib/firebase";

function edit() {
  const { id } = useParams();
  const [fdata, setFdata] = useState({
    age: "",
    email: "",
    gender: "",
    lastname: "",
    name: "",
    password: "",
    uid: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFdata((perv) => ({ ...perv, [name]: value }));
  };

  useEffect(() => {
    const fetchuser = async () => {
      if (!id) {
        return;
      }
      try {
        const docref = doc(db, "users", id as string);
        const snapshot = await getDoc(docref);
        if (snapshot.exists()) {
          const data = snapshot.data();
          setFdata({
            age: String(data.age),
            email: data.email,
            gender: data.gender,
            lastname: data.lastname,
            name: data.name,
            password: data.password,
            uid: data.uid,
          });
        } else {
          console.warn("dont find any data");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchuser()
  }, []);
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    const docref = doc(db,"users", id as string)
    await updateDoc(docref , {
      ...fdata
    })
    alert("className updated!");
    window.location.href = "/login-admin/dashbord/users";
  }
  return (
    <div>
      <form onSubmit={handleUpdate}>
        <input name="name" type="text" value={fdata.name} placeholder="name" onChange={handleChange} />
        <input name="lastname" type="text" value={fdata.lastname} placeholder="last name" onChange={handleChange} />
        <input name="email" type="email" value={fdata.email} placeholder="email" onChange={handleChange} />
        <input name="password" type="text" value={fdata.password} placeholder="password" onChange={handleChange} />
        <input name="age" type="text" value={fdata.age} placeholder="age" onChange={handleChange} />
        <select name="gender" value={fdata.gender} onSelect={handleChange}>
          <option value="true">male</option>
          <option value="false">female</option>
        </select>
        <input type="submit" />
      </form>
    </div>
  );
}

export default edit;
