import { lessonsData } from "@/app/data/lessonsData";

export default function LessonPage({ params }) {
  const { courseId, lessonId } = params;

  // get lessons of this course
  const courseLessons = lessonsData[courseId];

  // safety checks
  if (!courseLessons) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold">Course not found</h1>
      </div>
    );
  }

  // find lesson (force string compare)
  const lesson = courseLessons.find(
    (l) => String(l.id) === String(lessonId)
  );

  if (!lesson) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold">Lesson not found</h1>
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
      <p className="text-lg">{lesson.content}</p>
    </div>
  );
}