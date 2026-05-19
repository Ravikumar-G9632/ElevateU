"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";

export default function DashboardLayout({ children }) {
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn(); // redirect to login
    }
  }, [status]);

  if (status === "loading") {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-2xl">Loading...</h1>
      </div>
    );
  }

  return <>{children}</>;
}