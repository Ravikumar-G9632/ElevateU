export default function CertificateButton() {
  const generate = async () => {
    await fetch("/api/certificate");
    alert("Certificate generated!");
  };

  return (
    <button
      onClick={generate}
      className="bg-green-600 text-white px-6 py-3 rounded-xl">
      Download Certificate 🎉
    </button>
  );
}