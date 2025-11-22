"use client";
import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ClassesList from "./classes/page";

export default function Dashboard() {
  const router = useRouter();

  const logoutHandler = () => {
    deleteCookie("isAdmin");
    router.push("/login-admin");
  };

  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-800">
      
      {/* Sidebar */}
      <aside className="w-72 bg-gray-900 text-white p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl text-center font-extrabold mb-10">Admin Panel 🛠</h1>
          
          <nav className="flex flex-col gap-4">
            <Link
              href="/login-admin/dashbord/classes"
              className="bg-orange-500 hover:bg-orange-600 py-3 px-6 rounded-md text-lg font-semibold transition"
            >
              Classes
            </Link>
            <Link
              href="/login-admin/dashbord/users"
              className="bg-orange-500 hover:bg-orange-600 py-3 px-6 rounded-md text-lg font-semibold transition"
            >
              Users
            </Link>
          </nav>
        </div>
        
        <button
          onClick={logoutHandler}
          className="bg-red-500 hover:bg-red-600 py-3 px-6 rounded-md text-lg font-semibold transition mt-10"
        >
          Logout
        </button>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-4xl font-bold text-center mb-10">Dashboard Overview 🤓</h2>
        <div className="flex justify-center">
          <ClassesList />
        </div>
      </main>
    </div>
  );
}
