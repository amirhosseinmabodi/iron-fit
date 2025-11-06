"use client";
import React from "react";
import {
  useContext,
  createContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { db } from "../../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export interface IGymclassName {
  id?: string;
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

export interface IGymusers {
  uid: string;
  email: string;
  password: string;
  name: string;
  lastname: string;
  gender: Boolean;
  age: number;
}

interface context {
  classes: IGymclassName[];
  users: IGymusers[];
  refetch: () => Promise<void>;
}

const Context = createContext<context | undefined>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [classes, setClasses] = useState<IGymclassName[]>([]);
  const [users, setUsers] = useState<IGymusers[]>([]);

  const fetchclasses = async () => {
    try {
      const snapshot = await getDocs(collection(db, "classes"));
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as IGymclassName[];
      setClasses(list);
    } catch (error) {
      console.error("some things wrong!", error);
    }
  };
  const fetchusers = async () => {
    try {
      const snapshot = await getDocs(collection(db, "users"));
      const list = snapshot.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data(),
      })) as IGymusers[];
      setUsers(list);
    } catch (error) {
      console.error("some things wrong!", error);
    }
  };

  useEffect(() => {
    fetchclasses();
    fetchusers();
  }, []);

  return (
    <Context.Provider value={{ classes, users, refetch: { fetchclasses , fetchusers } }}>
      {children}
    </Context.Provider>
  );
};

export const usecontext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useclasses باید داخل classesProvider استفاده بشه");
  }
  return context;
};
