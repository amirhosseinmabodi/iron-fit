"use client";
import { url } from "inspector";
import Image from "next/image";
import { usecontext } from "../context/context";
import Link from "next/link";
import Loading from "./components/Loading";
import { useState } from "react";
export default function Home() {
  const { classes } = usecontext();
  console.log(console.log(classes.length));

  return (
    <div>
      <section
        className="relative h-screen flex items-center justify-center bg-no-repeat bg-cover"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/header.png')",
        }}
      >
        <div className="max-w-4xl m-auto p-4 text-center flex flex-col gap-4">
          <h1 className="lg:text-5xl sm:text-3xl font-bold text-orange-500 font-bold">
            Welcome to the City's Premier Fitness Club
          </h1>
          <p className="text-white lg:text-2xl md:text-lg font-bold ">
            Experience an unforgettable fitness journey with professional
            trainers and modern facilities
          </p>
          <div className="flex gap-4 justify-center items-center">
            <button className="bg-orange-500 text-white font-bold lg:text-xl text-sm  rounded lg:px-8 lg:py-4 cursor-pointer md:px-4 md:py-2 px-2 py-1">
              <Link href="/classes">View classes</Link>
            </button>
            <button className="bg-transparent text-white border-white border-2 hover:bg-white hover:text-black transition duration-300 rounded font-bold lg:text-xl text-sm lg:px-8 lg:py-4 cursor-pointer md:px-4 md:py-2 px-2 py-1">
              <Link href="/register">Join Free Trial</Link>
            </button>
          </div>
        </div>
      </section>
      <section>
        <div className="text-center max-w-7xl m-auto py-16">
          <h1 className="text-4xl font-bold text-orange-500 font-bold">
            Why Choose IronFit?
          </h1>
          <p className="text-gray-600 max-w-2xl m-auto pt-2 text-xl font-bold">
            With over 10 years of experience, we provide the best fitness
            services in the city
          </p>
        </div>
        <div className="grid lg:grid-cols-3 grid-cols-1 justify-between m-auto gap-4 p-8">
          <div className="shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-xl bg-white p-4 flex flex-col justify-center items-center gap-4">
            <div className="h-16 w-16 bg-blue-200 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="text-amber-50"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                />
              </svg>
            </div>
            <h3 className="text-2xl text-orange-500 font-bold">
              Expert Trainers
            </h3>
            <p className="text-gray-500 text-center max-w-2xl">
              Our team consists of experienced trainers with international
              certifications
            </p>
          </div>
          <div className="shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-xl bg-white p-4 flex flex-col justify-center items-center gap-4">
            <div className="h-16 w-16 bg-green-200 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            <h3 className="text-2xl text-orange-500 font-bold">
              Online Booking
            </h3>
            <p className="text-gray-500 text-center max-w-2xl">
              Easily book and manage your favorite classes with our online
              system
            </p>
          </div>
          <div className="shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-xl bg-white p-4 flex flex-col justify-center items-center gap-4">
            <div className="h-16 w-16 bg-violet-200 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0"
                />
              </svg>
            </div>
            <h3 className="text-2xl text-orange-500 font-bold">
              Modern Equipment
            </h3>
            <p className="text-gray-500 text-center max-w-2xl">
              State-of-the-art equipment and suitable environment for all types
              of workouts
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="text-center max-w-7xl m-auto py-16">
          <h1 className="text-4xl font-bold text-orange-500 font-bold">
            Popular classes
          </h1>
          <p className="text-gray-600 max-w-2xl m-auto pt-2 text-xl font-bold">
            From relaxing yoga to strength training, find the perfect className
            for you
          </p>
        </div>
        <div className="grid lg:grid-cols-3 grid-cols-1 justify-between m-auto gap-4 p-8">
          {classes.length === 0 ? (
            <div className="col-span-full">
              <Loading />
            </div>
          ) : (
            classes.map((cls) => (
              <div
                key={cls.id}
                className="shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-xl bg-white overflow-hidden flex flex-col justify-center items-center gap-4"
              >
                <img
                  className="w-full object-cover object-top h-64"
                  src={cls.image}
                  alt={cls.name}
                />
                <h3 className="text-2xl text-orange-500 font-bold">
                  {cls.name}
                </h3>
                <p className="text-gray-500 text-center max-w-2xl">
                  {cls.description}
                </p>
                <div className="flex justify-between items-center gap-4 mb-4">
                  <span className="text-sm">
                    {cls.capacity} spots available
                  </span>
                  <span className="text-sm text-blue-500">
                    ${cls.price}/className
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
      <section>
        <div className="max-w-full flex justify-evenly items-center bg-orange-500 py-20 mt-8">
          <div className="text-center">
            <h3 className="text-white font-bold text-4xl">1500+</h3>
            <p className="text-white text-sm">Active Members</p>
          </div>
          <div className="text-center">
            <h3 className="text-white font-bold text-4xl">20+</h3>
            <p className="text-white text-sm">className Types</p>
          </div>
          <div className="text-center">
            <h3 className="text-white font-bold text-4xl">15+</h3>
            <p className="text-white text-sm">Expert Trainers</p>
          </div>
          <div className="text-center">
            <h3 className="text-white font-bold text-4xl">10+</h3>
            <p className="text-white text-sm">Years Experience</p>
          </div>
        </div>
        <div className="bg-gray-900 text-white gap-2 py-20 flex justify-center flex-col items-center">
          <h2 className=" font-bold text-4xl">Ready to Start?</h2>
          <p>Join us today and experience an amazing fitness journey</p>
          <button className="bg-orange-500 py-4 px-8 rounded font-bold mt-4 hover:cursor-pointer hover:scale-105 transition-all duration-150">
            <Link href="/register">Start Free Trial</Link>
          </button>
        </div>
      </section>
    </div>
  );
}
