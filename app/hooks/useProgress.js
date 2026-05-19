"use client";
import { useEffect, useState } from "react";

export default function useProgress(courseId) {
  const [progress, setProgress] = useState("not-started");

  useEffect(() => {
    const stored = localStorage.getItem("progress-" + courseId);
    if (stored) setProgress(stored);
  }, [courseId]);

  const updateProgress = (value) => {
    localStorage.setItem("progress-" + courseId, value);
    setProgress(value);
  };

  return { progress, updateProgress };
}