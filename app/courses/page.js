import Link from "next/link";
import { lessonsData } from "@/app/data/lessonsData";

export default function CoursePage({ params }) {
  const { courseId } = params;

  const lessons = lessonsData[courseId];

  if (!lessons) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold">Course not found</h1>
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6 capitalize">
        {courseId} Course
      </h1>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/courses/${courseId}/lessons/${lesson.id}`}
            className="block p-4 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Lesson {lesson.id}: {lesson.title}
          </Link>
        ))}
      </div>
    </div>
  );
}