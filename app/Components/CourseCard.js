"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CourseCard({ course }) {
  const [progress, setProgress] = useState("not-started");

  useEffect(() => {
    const stored = localStorage.getItem("progress-" + course.id);
    if (stored) setProgress(stored);
  }, [course.id]);

  return (
    <Link href={`/courses/${course.id}`}>
      <div className="p-6 border rounded-xl hover:shadow-lg transition cursor-pointer">
        <h2 className="text-2xl font-bold text-blue-600">{course.title}</h2>
        <p className="mt-2 text-gray-600">{course.description}</p>

        <div className="mt-4 text-sm text-gray-500">
          {course.lessons} Lessons • {course.duration}
        </div>

        <p className="mt-4 font-semibold">
          Status: {progress === "completed" ? "✅ Completed" :
                   progress === "in-progress" ? "🚀 In Progress" :
                   "Not Started"}
        </p>
      </div>
    </Link>
  );
}