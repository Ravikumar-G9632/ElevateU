"use client"
import React from "react"

// Fake course progress data (later you can fetch from DB)
const courses = [
  {
    id: "python",
    title: "Python Mastery",
    progress: 35,
    lessonsCompleted: 7,
    totalLessons: 20,
    color: "bg-blue-500"
  },
  {
    id: "javascript",
    title: "JavaScript Pro",
    progress: 60,
    lessonsCompleted: 12,
    totalLessons: 20,
    color: "bg-yellow-500"
  },
  {
    id: "react",
    title: "React From Scratch",
    progress: 15,
    lessonsCompleted: 3,
    totalLessons: 20,
    color: "bg-cyan-500"
  }
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Header */}
      <h1 className="text-3xl font-bold mb-8">
        🎓 Your Learning Dashboard
      </h1>

      {/* Course Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">
              {course.title}
            </h2>

            <p className="text-sm text-gray-500 mb-4">
              {course.lessonsCompleted} / {course.totalLessons} lessons completed
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div
                className={`h-4 rounded-full ${course.color}`}
                style={{ width: `${course.progress}%` }}
              />
            </div>

            <p className="text-right text-sm font-medium">
              {course.progress}%
            </p>

            {/* Continue Button */}
            <button className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
              Continue Learning →
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}