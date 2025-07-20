import Link from "next/link";
import getRegionCountries from "../../../lib/getRegionCountries";

interface RegionPageProps {
  params: Promise<{
    name: string;
  }>;
}

const regionNames: { [key: string]: string } = {
  "northern-europe": "Northern Europe",
  "western-europe": "Western Europe",
  "southern-europe": "Southern Europe",
  "eastern-europe": "Eastern Europe",
  "central-america": "Central America",
  caribbean: "Caribbean",
  "north-america": "North America",
  "south-america": "South America",
  "western-africa": "Western Africa",
  "eastern-africa": "Eastern Africa",
  "northern-africa": "Northern Africa",
  "middle-africa": "Middle Africa",
  "southern-africa": "Southern Africa",
  "western-asia": "Western Asia",
  "central-asia": "Central Asia",
  "eastern-asia": "Eastern Asia",
  "south-eastern-asia": "South-Eastern Asia",
  "southern-asia": "Southern Asia",
  "australia-and-new-zealand": "Australia and New Zealand",
  melanesia: "Melanesia",
  micronesia: "Micronesia",
  polynesia: "Polynesia",
};

export default async function RegionPage({ params }: RegionPageProps) {
  const resolvedParams = await params;
  const regionName = regionNames[resolvedParams.name] || resolvedParams.name;

  // Convert slug back to proper region name for API
  const apiRegionName = regionName;

  // Handle case where region doesn't exist
  if (!regionNames[resolvedParams.name]) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-100 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-12 text-center max-w-md border border-white/20">
          <div className="text-8xl mb-6 animate-bounce">🚫</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent mb-6">
            Region Not Found
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            This region doesn&apos;t exist in our database.
          </p>
          <Link
            href="/"
            className="group bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 hover:from-blue-600 hover:via-purple-600 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 inline-block"
          >
            <span className="flex items-center gap-2">
              🗺️ Return to Map
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </span>
          </Link>
        </div>
      </div>
    );
  }

  // Fetch countries data
  let countries: Country[] = [];
  let error: string | null = null;

  try {
    countries = await getRegionCountries(apiRegionName);
  } catch (err) {
    error = "Failed to load countries data";
    console.error("Error fetching countries:", err);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-8 border border-white/30">
          <div className="text-center">
            <div className="text-8xl mb-6 animate-bounce">🗺️</div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent mb-4">
              Welcome to {regionName}!
            </h1>
            <p className="text-gray-600 text-xl mb-6">
              Discover the countries and territories of this region
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
                  {countries.length}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  Countries & Territories
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
                  {(() => {
                    const totalPopulation = countries.reduce(
                      (total, country) => total + country.population,
                      0
                    );
                    if (totalPopulation >= 1000000000) {
                      return `${(totalPopulation / 1000000000).toFixed(1)}B`;
                    } else if (totalPopulation >= 1000000) {
                      return `${(totalPopulation / 1000000).toFixed(0)}M`;
                    } else if (totalPopulation >= 1000) {
                      return `${(totalPopulation / 1000).toFixed(0)}K`;
                    }
                    return totalPopulation.toString();
                  })()}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  Total Population
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50/90 backdrop-blur-sm border border-red-200 rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-4 text-center justify-center">
              <span className="text-red-600 text-4xl">⚠️</span>
              <div>
                <h3 className="font-bold text-red-800 text-xl mb-2">
                  Unable to Load Countries
                </h3>
                <p className="text-red-600">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Countries List */}
        {countries.length > 0 && (
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/30">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              🏛️ Countries & Territories
            </h2>

            {/* Countries Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {countries.map((country) => (
                <Link
                  href={`/country/${encodeURIComponent(country.name.common)}`}
                  key={country.cca3}
                  className="group p-4 bg-white/70 hover:bg-white/90 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105 block"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                      {country.flag}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-800 truncate group-hover:text-purple-600 transition-colors duration-300">
                        {country.name.common}
                      </h3>
                      <p className="text-sm text-gray-500 truncate">
                        {country.capital?.[0] || "No capital"}
                      </p>
                    </div>
                    <svg
                      className="w-4 h-4 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-8 text-center p-6 bg-gray-50/80 rounded-2xl">
              <p className="text-gray-600">
                <span className="font-semibold">{countries.length}</span>{" "}
                countries and territories make up {regionName}, each with its
                own unique culture, history, and beauty waiting to be explored.
              </p>
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="group bg-gradient-to-r from-purple-500 to-pink-600 hover:shadow-2xl text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-xl transform hover:-translate-y-2 hover:scale-105 inline-block relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3 text-lg">
              🗺️ Back to World Map
              <span className="group-hover:translate-x-2 transition-transform duration-300">
                ✨
              </span>
            </span>
            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </Link>
        </div>
      </div>
    </div>
  );
}
