"use client";
import { useSession } from "next-auth/react";

export default function WelcomeCard() {
  const { data: session } = useSession();

  return (
    <div className="bg-blue-600 text-white p-8 rounded-2xl shadow">
      <h1 className="text-3xl font-bold">
        Welcome back {session?.user?.name || "Learner"} 👋
      </h1>
      <p className="mt-2 text-blue-100">
        Continue your learning journey today.
      </p>
    </div>
  );
}