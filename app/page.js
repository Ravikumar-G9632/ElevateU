import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">

      {/* HERO */}
      <section className="max-w-6xl mx-auto text-center py-24 px-6">
        <h1 className="text-6xl font-extrabold text-gray-900 leading-tight">
          Learn Skills That <span className="text-blue-600">Matter</span>
        </h1>

        <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
          Master industry-ready skills, track progress, and earn certificates to
          boost your career 🚀
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link href="/courses">
            <button className="px-8 py-4 bg-blue-600 text-white rounded-xl text-lg hover:bg-blue-700 transition">
              Explore Courses
            </button>
          </Link>

          <Link href="/login">
            <button className="px-8 py-4 border border-blue-600 text-blue-600 rounded-xl text-lg hover:bg-blue-50 transition">
              Get Started
            </button>
          </Link>
        </div>
      </section>

    </main>
  );
}