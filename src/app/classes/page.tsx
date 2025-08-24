"use client"
import React, { useContext } from 'react'
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { Timestamp } from 'next/dist/server/lib/cache-handlers/types';
import {usecontext} from "../../context/context"

function classes() {
  const {classes} = usecontext()
  return (
    <div>
      {classes.map(cls => (
        <div key={cls.id}>
          <h2>{cls.name}</h2>
          <p>{cls.coach}</p>
        </div>
      ))}
    </div>
  )
}

export default classes