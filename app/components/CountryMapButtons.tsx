"use client";

interface CountryMapButtonsProps {
  googleMapsUrl: string;
  openStreetMapsUrl: string;
}

export default function CountryMapButtons({
  googleMapsUrl,
  openStreetMapsUrl,
}: CountryMapButtonsProps) {
  return (
    <div className="space-y-4">
      <button
        onClick={() => window.open(googleMapsUrl, "_blank")}
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
      >
        🗺️ View on Google Maps
      </button>
      <button
        onClick={() => window.open(openStreetMapsUrl, "_blank")}
        className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
      >
        🌐 View on OpenStreetMap
      </button>
    </div>
  );
}
