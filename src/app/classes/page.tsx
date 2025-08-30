"use client"
import React, { useContext } from 'react'
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { Timestamp } from 'next/dist/server/lib/cache-handlers/types';
import {usecontext} from "../../context/context"
import Link from 'next/link';

function classes() {
  const {classes} = usecontext()
  console.log(classes);
  
  return (
    <div>
      {classes.map(cls => (
        <div key={cls.id}>
          <h2>{cls.name}</h2>
          <p>{cls.coach}</p>
          <Link href={`/classes/${cls.id}`}>see details</Link>
        </div>
      ))}
    </div>
  )
}

export default classes