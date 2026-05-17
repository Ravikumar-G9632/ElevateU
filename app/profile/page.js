"use client";
import { useSession, signOut } from "next-auth/react";

export default function Profile() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl">Loading profile...</div>
      </div>
    );
  }

  if (!session) {
    // Not logged in
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="bg-white p-10 rounded-2xl shadow-xl w-96 text-center">
          <h2 className="text-2xl font-bold mb-4">You are not logged in</h2>
          <a href="/login" className="text-blue-600 underline">Go to Login</a>
        </div>
      </div>
    );
  }

  const { user } = session;

  return (
    <div className="flex h-screen items-center justify-center bg-linear-to-br from-blue-50 to-white">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-96 text-center">
        <img
          src={user.image || "/default-avatar.png"}
          alt="Profile Picture"
          className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-200"
        />
        <h2 className="text-3xl font-bold mb-2">{user.name || "User"}</h2>
        <p className="text-gray-600 mb-4">{user.email}</p>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
