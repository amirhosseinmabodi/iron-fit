"use client";
import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usecontext } from "@/context/context";

export default function Dashboard() {
  const router = useRouter();
  const { classes } = usecontext();
  const { users } = usecontext();
  console.log(classes);

  const logoutHandler = () => {
    deleteCookie("isAdmin");
    router.push("/login-admin");
  };

  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside className="w-72 bg-gray-900 text-white p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl text-center font-extrabold mb-10">
            Admin Panel 🛠
          </h1>

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

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 space-y-14">
        <h2 className="text-4xl font-bold text-center">
          Dashboard Overview 🤓
        </h2>

        {/* CLASSES SECTION */}
        <section>
          <h3 className="text-2xl font-semibold mb-6">Classes</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((cls: IGymClass) => (
              <div
                key={cls.id}
                className="bg-orange-500 text-white rounded-xl shadow-md p-4 hover:shadow-lg transition border"
              >
                <img
                  src={cls.image}
                  alt={cls.name}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />

                <h4 className="text-xl font-bold text-white text-center">
                  {cls.name}
                </h4>

                <p className="text-gray-50 text-sm mt-2 line-clamp-2">
                  {cls.description}
                </p>

                <div className="grid text-sm">
                  <p>
                    <strong>Coach:</strong> {cls.coach}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {cls.date?.seconds ? (
                      <>
                        {new Date(cls.date.seconds * 1000).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                        {" | "}
                        {new Date(cls.date.seconds * 1000).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </>
                    ) : (
                      "Invalid date"
                    )}
                  </p>
                  <p>
                    <strong>duration:</strong> {cls.duration}
                  </p>
                  <p>
                    <strong>Price:</strong> ${cls.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* USERS SECTION */}
        <section>
          <h3 className="text-2xl font-semibold mb-6">Users</h3>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
              <thead className="bg-orange-500 text-white">
                <tr>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Age</th>
                  <th className="py-3 px-4">Gender</th>
                </tr>
              </thead>

              <tbody>
                {users.map((usr: IGymusers) => (
                  <tr
                    key={usr.uid}
                    className="border-t hover:bg-orange-50 transition"
                  >
                    <td className="py-3 px-4 font-semibold">
                      {usr.name} {usr.lastname}
                    </td>
                    <td className="py-3 px-4">{usr.email}</td>
                    <td className="py-3 px-4">{usr.age}</td>
                    <td className="py-3 px-4">
                      {usr.gender ? "Male" : "Female"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
