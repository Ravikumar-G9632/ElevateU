"use client";

import { useParams } from "next/navigation";

export default function CertificatePage() {
  const { courseId } = useParams();

  const downloadCertificate = () => {
    window.print(); // simple print → save as PDF
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <div className="bg-white p-12 shadow-2xl rounded-xl text-center w-[800px]">
        <h1 className="text-4xl font-bold text-blue-600">Certificate of Completion</h1>

        <p className="mt-6 text-xl">This certifies that</p>

        <h2 className="text-3xl font-bold mt-4">GitHub User</h2>

        <p className="mt-6 text-xl">has successfully completed the course</p>

        <h3 className="text-2xl font-semibold mt-4 text-blue-600 capitalize">
          {courseId}
        </h3>

        <p className="mt-6 text-gray-500">
          Issued by ElevateU
        </p>

        <button
          onClick={downloadCertificate}
          className="mt-10 px-8 py-4 bg-blue-600 text-white rounded-lg text-lg"
        >
          Download Certificate
        </button>
      </div>

    </main>
  );
}