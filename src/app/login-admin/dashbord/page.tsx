"use client";
import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const logoutHandler = () => {
    deleteCookie("isAdmin");
    router.push("/login-admin");
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl">Admin Dashboard</h1>
      <div className="flex gap-4 mt-4 text-2xl">
        <Link className="hover:text-orange-500 transition duration-300  font-bold py-2 px-4 bg-amber-400 text-white rounded" href="/login-admin/dashbord/classes">classes</Link>
        <Link className="hover:text-orange-500 transition duration-300 font-bold py-2 px-4 bg-amber-400 text-white rounded" href="/login-admin/dashbord/users">users</Link>
      </div>
      <button
        onClick={logoutHandler}
        className="bg-red-500 text-white px-4 py-2 mt-5"
      >
        Logout
      </button>
    </div>
  );
}
