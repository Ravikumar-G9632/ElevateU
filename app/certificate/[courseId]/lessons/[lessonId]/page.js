"use client";
import { useParams } from "next/navigation";

export default function CertificatePage() {
  const { courseId } = useParams();

  const downloadCertificate = () => {
    window.print(); // simple certificate download (PDF)
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-10">
      
      <div className="bg-white p-12 border-4 border-blue-600 rounded-xl text-center shadow-xl">
        <h1 className="text-5xl font-bold text-blue-600">
          Certificate of Completion
        </h1>

        <p className="mt-10 text-xl">This is proudly presented to</p>

        <h2 className="text-3xl font-bold mt-4">ElevateU Student</h2>

        <p className="mt-6 text-lg">
          For successfully completing the course
        </p>

        <h3 className="text-2xl font-bold mt-2 capitalize text-green-600">
          {courseId}
        </h3>

        <p className="mt-8">Issued by ElevateU</p>
      </div>

      <button
        onClick={downloadCertificate}
        className="mt-10 px-8 py-4 bg-blue-600 text-white rounded-xl text-lg"
      >
        Download Certificate
      </button>
    </div>
  );
}