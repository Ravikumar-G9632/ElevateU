import Link from "next/link";
import { courses } from "@/lib/courses";

export default function CoursePage({ params }) {
  const course = courses.find(c => c.id === params.courseId);

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">{course.title}</h1>

      <div className="mt-8">
        {Array.from({length: course.videos}).map((_,i)=>(
          <Link key={i}
            href={`/course/${course.id}/learn/${i}`}>
            <div className="p-4 border rounded-lg my-2">
              Lesson {i+1}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}