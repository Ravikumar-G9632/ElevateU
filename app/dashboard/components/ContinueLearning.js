"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ContinueLearning() {
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("last-course");
    if (data) setCourse(JSON.parse(data));
  }, []);

  if (!course) return null;

  return (
    <div style={{
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      marginTop: "20px"
    }}>
      <h2>Continue Learning 🚀</h2>
      <p>Resume where you left off</p>

      <Link href={`/courses/${course.courseId}/lessons/${course.lessonId}`}>
        <button>Resume Course</button>
      </Link>
    </div>
  );
}