"use client";
import { deleteCookie } from "cookies-next";
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
      <button
        onClick={logoutHandler}
        className="bg-red-500 text-white px-4 py-2 mt-5"
      >
        Logout
      </button>
    </div>
  );
}
