"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if already logged in
  if (session) {
    router.replace("/profile"); // Change "/profile" to your desired page
    return null;
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-96">
        <h2 className="text-3xl font-bold text-center">Login</h2>

        <button onClick={() => signIn("google")}
          className="login-btn bg-red-500">Google</button>

        <button onClick={() => signIn("github")}
          className="login-btn bg-black">GitHub</button>

        <button onClick={() => signIn("facebook")}
          className="login-btn bg-blue-700">Facebook</button>
      </div>
    </div>
  );
}