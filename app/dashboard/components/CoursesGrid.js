import Link from "next/link";

const COURSES = [
  { id: "python", title: "Python Mastery" },
  { id: "webdev", title: "Web Development" },
  { id: "ai", title: "AI Fundamentals" },
];

export default function CoursesGrid() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Available Courses</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {COURSES.map(course => (
          <Link key={course.id} href={`/courses/${course.id}`}>
            <div className="p-6 border rounded-xl hover:shadow-lg cursor-pointer">
              <h3 className="text-xl font-bold text-blue-600">
                {course.title}
              </h3>
              <p className="text-gray-600 mt-2">
                Start learning today 🚀
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
