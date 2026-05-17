import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto text-center py-20">
        <h1 className="text-6xl font-bold text-blue-600">
          ElevateU
        </h1>
        <p className="mt-6 text-xl text-gray-600">
          Learn industry skills & get certified
        </p>
        <Link href="/login">
          <button className="mt-10 px-8 py-4 bg-blue-600 text-white rounded-xl text-lg">
            Start Learning
          </button>
        </Link>
      </div>
    </main>
  );
}