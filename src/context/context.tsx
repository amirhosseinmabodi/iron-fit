"use client"
import React from 'react'
import { useContext , createContext , useEffect, useState, ReactNode  } from 'react'
import { db } from "../../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export interface IGymClass {
    id?:  string;
    name: string; 
    coach: string; 
    capacity: number; 
    image: string;
    description: string; 
    date: Date; 
    duration: number; 
    price: number; 
    reservedUsers: string[]; 
}

interface context {
    classes : IGymClass[]
    refetch: () => Promise<void>;
}

const Context = createContext<context | undefined>(undefined)

export const ContextProvider = ({children} : {children: ReactNode}) =>{
    const [classes, setClasses] = useState<IGymClass[]>([]);

  const fetchClasses = async () => {
    try {
      const snapshot = await getDocs(collection(db, "classes"));
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as IGymClass[];
      setClasses(list);
    } catch (error) {
      console.error("خطا در دریافت کلاس‌ها:", error);
    } 
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <Context.Provider value={{ classes , refetch: fetchClasses }}>
      {children}
    </Context.Provider>
  );
};

export const usecontext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useClasses باید داخل ClassesProvider استفاده بشه");
  }
  return context;
};