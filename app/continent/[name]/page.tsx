import getContinentCountries from "@/lib/getContinentCountries";
import getRegionCountries from "@/lib/getRegionCountries";
import Link from "next/link";

interface ContinentPageProps {
  params: Promise<{
    name: string;
  }>;
}

// Map continent slugs to API regions/subregions
const continentToApiCall: {
  [key: string]: { type: "region" | "subregion"; value: string };
} = {
  "north-america": { type: "subregion", value: "North America" },
  "south-america": { type: "subregion", value: "South America" },
  europe: { type: "region", value: "Europe" },
  africa: { type: "region", value: "Africa" },
  asia: { type: "region", value: "Asia" },
  australia: { type: "region", value: "Oceania" },
};

const continentNames: { [key: string]: string } = {
  "north-america": "North America",
  "south-america": "South America",
  europe: "Europe",
  africa: "Africa",
  asia: "Asia",
  australia: "Australia",
};

export default async function ContinentPage({ params }: ContinentPageProps) {
  const resolvedParams = await params;
  const continentName =
    continentNames[resolvedParams.name] || resolvedParams.name;
  const apiCall = continentToApiCall[resolvedParams.name];

  // Handle case where continent doesn't exist
  if (!continentNames[resolvedParams.name]) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-100 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-12 text-center max-w-md border border-white/20">
          <div className="text-8xl mb-6 animate-bounce">🚫</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent mb-6">
            Oops! Not Found
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            This continent doesn&apos;t exist in our magical world map.
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

  // Fetch countries data using the appropriate API function
  let countries: Country[] = [];
  let error: string | null = null;

  try {
    if (apiCall.type === "subregion") {
      // Use getRegionCountries for North and South America
      countries = await getRegionCountries(apiCall.value);
    } else {
      // Use getContinentCountries for other continents
      countries = await getContinentCountries(apiCall.value);
    }
  } catch (err) {
    error = "Failed to load countries data";
    console.error("Error fetching countries:", err);
  }

  // Get continent emoji and colors
  const continentData: {
    [key: string]: { emoji: string; gradient: string; bg: string };
  } = {
    "north-america": {
      emoji: "🏔️",
      gradient: "from-blue-500 to-cyan-600",
      bg: "from-blue-50 via-cyan-50 to-blue-100",
    },
    "south-america": {
      emoji: "🏞️",
      gradient: "from-green-500 to-yellow-600",
      bg: "from-green-50 via-yellow-50 to-emerald-100",
    },
    europe: {
      emoji: "🏰",
      gradient: "from-purple-500 to-indigo-600",
      bg: "from-purple-50 via-indigo-50 to-violet-100",
    },
    africa: {
      emoji: "🦁",
      gradient: "from-orange-500 to-red-600",
      bg: "from-orange-50 via-red-50 to-amber-100",
    },
    asia: {
      emoji: "🏯",
      gradient: "from-red-500 to-pink-600",
      bg: "from-red-50 via-pink-50 to-rose-100",
    },
    australia: {
      emoji: "🦘",
      gradient: "from-teal-500 to-blue-600",
      bg: "from-teal-50 via-blue-50 to-cyan-100",
    },
  };

  const data = continentData[resolvedParams.name] || {
    emoji: "🌍",
    gradient: "from-gray-500 to-gray-600",
    bg: "from-gray-50 to-gray-100",
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${data.bg} p-4 relative overflow-hidden`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-8 border border-white/30">
          <div className="text-center">
            <div className="text-8xl mb-6 animate-bounce">{data.emoji}</div>
            <h1
              className={`text-5xl font-black bg-gradient-to-r ${data.gradient} bg-clip-text text-transparent mb-4`}
            >
              Welcome to {continentName}!
            </h1>
            <p className="text-gray-600 text-xl mb-6">
              Discover the countries and territories of this amazing continent
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-8">
              <div className="text-center">
                <div
                  className={`text-3xl font-bold bg-gradient-to-r ${data.gradient} bg-clip-text text-transparent`}
                >
                  {countries.length}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  Countries & Territories
                </div>
              </div>
              <div className="text-center">
                <div
                  className={`text-3xl font-bold bg-gradient-to-r ${data.gradient} bg-clip-text text-transparent`}
                >
                  {countries.reduce(
                    (total, country) => total + country.population,
                    0
                  ) >= 1000000
                    ? `${(
                        countries.reduce(
                          (total, country) => total + country.population,
                          0
                        ) / 1000000
                      ).toFixed(0)}M`
                    : `${(
                        countries.reduce(
                          (total, country) => total + country.population,
                          0
                        ) / 1000
                      ).toFixed(0)}K`}
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
                <div
                  key={country.cca3}
                  className="group p-4 bg-white/70 hover:bg-white/90 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                      {country.flag}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-800 truncate group-hover:text-blue-600 transition-colors duration-300">
                        {country.name.common}
                      </h3>
                      <p className="text-sm text-gray-500 truncate">
                        {country.capital?.[0] || "No capital"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-8 text-center p-6 bg-gray-50/80 rounded-2xl">
              <p className="text-gray-600">
                <span className="font-semibold">{countries.length}</span>{" "}
                countries and territories make up {continentName}, each with its
                own unique culture, history, and beauty waiting to be explored.
              </p>
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className={`group bg-gradient-to-r ${data.gradient} hover:shadow-2xl text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-xl transform hover:-translate-y-2 hover:scale-105 inline-block relative overflow-hidden`}
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
