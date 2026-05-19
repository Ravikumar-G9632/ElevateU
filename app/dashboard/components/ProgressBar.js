"use client";

export default function ProgressBar({ completed, total }) {
  const percentage = Math.round((completed / total) * 100);

  return (
    <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
      <div
        className="bg-green-500 h-4 rounded-full transition-all duration-500"
        style={{ width: `${percentage}%` }}
      ></div>
      <p className="text-sm mt-1">{percentage}% completed</p>
    </div>
  );
}