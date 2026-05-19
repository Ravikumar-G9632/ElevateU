"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow">
      <Link href="/" className="text-2xl font-bold text-blue-600">
        ElevateU
      </Link>

      <div className="flex gap-6 items-center">
        <Link href="/course">Courses</Link>

        {session ? (
          <>
            <Link href="/dashboard">Dashboard</Link>

            <img
              src={session.user.image}
              className="w-8 h-8 rounded-full"
            />

            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}