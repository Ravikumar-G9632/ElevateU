"use client";

import { useSession } from "next-auth/react";
import { courses } from "../data/courses";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { data: session } = useSession();
  const [completed, setCompleted] = useState(0);
  const [inProgress, setInProgress] = useState(0);

  useEffect(() => {
    let completedCount = 0;
    let progressCount = 0;

    courses.forEach((course) => {
      const status = localStorage.getItem("progress-" + course.id);
      if (status === "completed") completedCount++;
      if (status === "in-progress") progressCount++;
    });

    setCompleted(completedCount);
    setInProgress(progressCount);
  }, []);

  return (
    <main className="max-w-6xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold text-blue-600">
        Welcome {session?.user?.name} 👋
      </h1>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mt-10">
        <div className="p-6 bg-blue-50 rounded-xl">
          <h2 className="text-xl font-semibold">Total Courses</h2>
          <p className="text-3xl font-bold mt-2">{courses.length}</p>
        </div>

        <div className="p-6 bg-green-50 rounded-xl">
          <h2 className="text-xl font-semibold">Completed</h2>
          <p className="text-3xl font-bold mt-2">{completed}</p>
        </div>

        <div className="p-6 bg-yellow-50 rounded-xl">
          <h2 className="text-xl font-semibold">In Progress</h2>
          <p className="text-3xl font-bold mt-2">{inProgress}</p>
        </div>
      </div>

      {/* Continue Learning */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold">Continue Learning</h2>
        <Link href="/courses">
          <button className="mt-6 px-8 py-4 bg-blue-600 text-white rounded-xl">
            Browse Courses 🚀
          </button>
        </Link>
      </div>
    </main>
  );
}