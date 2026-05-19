import { lessonsData } from "@/app/data/lessonsData";

export default function LessonPage({ params }) {
  const { courseId, lessonId } = params;

  // get lessons of that course
  const courseLessons = lessonsData[courseId];

  // find current lesson
  const lesson = courseLessons?.find((l) => l.id === lessonId);

  // if lesson not found
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