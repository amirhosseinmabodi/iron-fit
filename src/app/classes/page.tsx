"use client";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { Timestamp } from "next/dist/server/lib/cache-handlers/types";
import { usecontext } from "../../context/context";
import Link from "next/link";

function classes() {
  const { classes } = usecontext();
  const [search, setSearch] = useState("");

  const filter = classes.filter((cls) =>
    cls.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );
  return (
    <div>
      <div className="bg-orange-500 p-16 text-center text-white">
        <h1 className="font-bold text-4xl">Fitness Classes</h1>
        <p className="text-sm pt-4">
          Choose from over 20 diverse classes to find the perfect fit for you
        </p>
      </div>
      <div className=" border border-orange-500 flex justify-center items-center m-auto my-4 px-4 max-w-max gap-4 rounded-full">
        <input
          type="text"
          className="outline-0 p-4"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 opacity-20"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8 p-16">
        {filter.map((cls) => (
          <div
            key={cls.id}
            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="relative">
              <img
                className="w-full object-cover object-top h-64"
                src={cls.image}
                alt={cls.name}
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-gray-900">{cls.name}</h3>
                <span className="text-2xl font-bold text-orange-500">
                  ${cls.price}
                </span>
              </div>
              <div className="mb-4 space-y-2">
                <div className="flex items-center text-gray-600">
                  <i className="h-4 w-4 mr-2 flex justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                  </i>
                  <span className="text-sm">{cls.coach}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <i className="h-4 w-4 mr-2 flex justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </i>
                  <span className="text-sm">{cls.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <i className="h-4 w-4 mr-2 flex justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                      />
                    </svg>
                  </i>
                  <span className="text-sm">
                    {cls.date.toDate().toLocaleDateString("en-US")}
                  </span>
                </div>
                <div className="flex justify-between items-start m-3">
                  <h3 className="text-sm text-gray-900">
                    {cls.reservedUsers.length}/{cls.capacity}
                  </h3>
                  <span className="text-sm text-orange-500">
                    {cls.capacity - cls.reservedUsers.length} spots left
                  </span>
                </div>
              </div>
              <div className="bg-gray-200 w-full rounded-full h-2 mb-4">
                <div
                  className="h-2 rounded-full bg-green-500"
                  style={{ width: "75%" }}
                ></div>
              </div>
              <button className="w-full bg-orange-500 text-white rounded p-4">
                <Link href={`/classes/${cls.id}`}>Book Now</Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default classes;
