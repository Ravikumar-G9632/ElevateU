"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">

      <div className="bg-white p-10 rounded-2xl shadow-xl text-center w-[400px]">
        <h1 className="text-3xl font-bold text-blue-600">Welcome Back 👋</h1>
        <p className="text-gray-500 mt-2">Login to continue learning</p>

        {/* GitHub Login Button */}
        <button
          onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          className="mt-8 w-full bg-black text-white py-3 rounded-lg text-lg hover:opacity-90 transition"
        >
          Continue with GitHub
        </button>

      </div>

    </main>
  );
}