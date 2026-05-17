import CourseCard from "@/components/CourseCard";
import { courses } from "@/lib/courses";

export default function Dashboard() {
  return (
    <div className="p-10 grid grid-cols-3 gap-6">
      {courses.map(course => (
        <CourseCard key={course.id} course={course}/>
      ))}
    </div>
  );
}