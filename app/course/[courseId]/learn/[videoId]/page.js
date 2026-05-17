export default function LearnPage({ params }) {
  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold">
        Lesson {params.videoId}
      </h2>

      <iframe
        className="w-full h-[500px] mt-6"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
      />
    </div>
  );
}