"use client";
import Link from "next/link";
import React, { useState } from "react";
import { getCookie } from "cookies-next";

function Navbar() {
  const uid = getCookie("UID");
  console.log(uid);
  const [open, setOpen] = useState(false);

  return (
    <div className="px-7 flex justify-around items-center mx-auto shadow h-16">
      <h1 className="text-orange-500 font-bold uppercase text-2xl">ironfit</h1>
      <div className="hidden md:flex gap-4 text-center capitalize">
        <Link
          className="hover:text-orange-500 transition hover:font-bold"
          href="/"
        >
          Home
        </Link>
        <Link
          className=" hover:text-orange-500 transition  hover:font-bold"
          href="/classes"
        >
          classes
        </Link>
        <Link
          className=" hover:text-orange-500 transition  hover:font-bold"
          href="/about"
        >
          about
        </Link>
        <Link
          className=" hover:text-orange-500 transition  hover:font-bold"
          href="/contact"
        >
          contact
        </Link>
      </div>
      <div className="hidden md:flex gap-4 text-center capitalize items-center justify-center">
        {uid ? (
          <Link
            href="/dashbord"
            className=" hover:text-orange-500 transition  hover:font-bold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-12 gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </Link>
        ) : (
          <>
            <Link
              href="/login"
              className=" hover:text-orange-500 transition  hover:font-bold cursor-pointer"
            >
              <button className="cursor-pointer">Login</button>
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-orange-500 text-white font-bold rounded"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
      <button
        className="md:hidden flex flex-col gap-1"
        onClick={() => setOpen(!open)}
      >
        <span className="w-6 h-0.5 bg-black"></span>
        <span className="w-6 h-0.5 bg-black"></span>
        <span className="w-6 h-0.5 bg-black"></span>
      </button>
      {open && (
        <div className="md:hidden bg-orange-500 w-64 right-0 overflow-y-visible py-4 absolute top-16 z-1">
          <div className="flex flex-col gap-4 text-center text-white capitalize">
            <Link
              className="hover:text-orange-500 transition hover:font-bold hover:bg-white"
              href="/"
            >
              Home
            </Link>
            <Link
              className=" hover:text-orange-500 transition  hover:font-bold  hover:bg-white"
              href="/classes"
            >
              classes
            </Link>
            <Link
              className=" hover:text-orange-500 transition  hover:font-bold  hover:bg-white"
              href="/about"
            >
              about
            </Link>
            <Link
              className=" hover:text-orange-500 transition  hover:font-bold  hover:bg-white"
              href="/contact"
            >
              contact
            </Link>
            {uid ? (
              <Link
                href="/dashbord"
                className=" hover:text-orange-500 transition  hover:font-bold hover:bg-white"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className=" hover:text-orange-500 transition  hover:font-bold cursor-pointer hover:bg-white"
                >
                  <button className="cursor-pointer">Login</button>
                </Link>
                <Link
                  href="/register"
                  className="bg-orange-500 text-white hover:font-bold hover:bg-white hover:text-orange-500"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
