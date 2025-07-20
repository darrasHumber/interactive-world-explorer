import Link from "next/link";
import getCountry from "../../../lib/getCountry";
import CountryMapButtons from "@/app/components/CountryMapButtons";

interface CountryPageProps {
  params: Promise<{
    name: string;
  }>;
}

export default async function CountryPage({ params }: CountryPageProps) {
  const resolvedParams = await params;
  const countryName = decodeURIComponent(resolvedParams.name);

  // Fetch country data
  let country: Country | null = null;
  let error: string | null = null;

  try {
    const countryData = await getCountry(countryName);
    country = countryData[0]; // API returns array, we take first result
  } catch (err) {
    error = "Failed to load country data";
    console.error("Error fetching country:", err);
  }

  // Error state
  if (error || !country) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-100 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-12 text-center max-w-md border border-white/20">
          <div className="text-8xl mb-6 animate-bounce">🚫</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent mb-6">
            Country Not Found
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            {error || "The country you're looking for doesn't exist."}
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

  // Helper functions
  const formatPopulation = (population: number) => {
    if (population >= 1000000000) {
      return `${(population / 1000000000).toFixed(1)} billion`;
    } else if (population >= 1000000) {
      return `${(population / 1000000).toFixed(1)} million`;
    } else if (population >= 1000) {
      return `${(population / 1000).toFixed(0)} thousand`;
    }
    return population.toLocaleString();
  };

  const formatArea = (area: number) => {
    return `${area.toLocaleString()} km²`;
  };

  const getCurrencyInfo = () => {
    if (!country?.currencies) return "N/A";
    const currencies = Object.values(country.currencies);
    return currencies.map((curr) => `${curr.name} (${curr.symbol})`).join(", ");
  };

  const getLanguages = () => {
    if (!country?.languages) return "N/A";
    return Object.values(country.languages).join(", ");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-8 border border-white/30">
          <div className="text-center mb-8">
            <div className="text-8xl mb-6 animate-bounce">{country.flag}</div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              {country.name.common}
            </h1>
            {country.name.official !== country.name.common && (
              <p className="text-xl text-gray-600 mb-4">
                Official: {country.name.official}
              </p>
            )}
            <div className="flex justify-center gap-4 mb-6">
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                {country.region}
              </span>
              <span className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-semibold">
                {country.subregion}
              </span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-2xl">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {formatPopulation(country.population)}
              </div>
              <div className="text-sm text-blue-600 font-medium">
                Population
              </div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-2xl">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {formatArea(country.area)}
              </div>
              <div className="text-sm text-green-600 font-medium">Area</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-2xl">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {country.capital?.[0] || "N/A"}
              </div>
              <div className="text-sm text-purple-600 font-medium">Capital</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-2xl">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {country.cca2}
              </div>
              <div className="text-sm text-orange-600 font-medium">
                Country Code
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Basic Info */}
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/30">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              📋 Basic Information
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span className="font-medium text-gray-700">Languages:</span>
                <span className="text-gray-800">{getLanguages()}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span className="font-medium text-gray-700">Currency:</span>
                <span className="text-gray-800">{getCurrencyInfo()}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span className="font-medium text-gray-700">Calling Code:</span>
                <span className="text-gray-800">
                  {country.idd.root}
                  {country.idd.suffixes?.[0] || ""}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span className="font-medium text-gray-700">Internet TLD:</span>
                <span className="text-gray-800">
                  {country.tld?.[0] || "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span className="font-medium text-gray-700">Landlocked:</span>
                <span className="text-gray-800">
                  {country.landlocked ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </div>

          {/* Geography & More */}
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/30">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              🌍 Geography & More
            </h2>
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="font-medium text-gray-700 block mb-1">
                  Coordinates:
                </span>
                <span className="text-gray-800">
                  {country.latlng[0]}°, {country.latlng[1]}°
                </span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="font-medium text-gray-700 block mb-1">
                  Timezones:
                </span>
                <span className="text-gray-800">
                  {country.timezones.slice(0, 3).join(", ")}
                  {country.timezones.length > 3 && "..."}
                </span>
              </div>
              {country.borders && country.borders.length > 0 && (
                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="font-medium text-gray-700 block mb-1">
                    Borders:
                  </span>
                  <span className="text-gray-800">
                    {country.borders.join(", ")}
                  </span>
                </div>
              )}
              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="font-medium text-gray-700 block mb-1">
                  UN Member:
                </span>
                <span className="text-gray-800">
                  {country.unMember ? "Yes" : "No"}
                </span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="font-medium text-gray-700 block mb-1">
                  Independent:
                </span>
                <span className="text-gray-800">
                  {country.independent ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Maps and Flag */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-8 border border-white/30">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            🏁 Flag & Maps
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center">
              <img
                src={country.flags.svg}
                alt={`Flag of ${country.name.common}`}
                className="w-full max-w-md mx-auto rounded-xl shadow-lg"
              />
              <p className="text-sm text-gray-600 mt-4">{country.flags.alt}</p>
            </div>
            <CountryMapButtons
              googleMapsUrl={country.maps.googleMaps}
              openStreetMapsUrl={country.maps.openStreetMaps}
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center">
          <Link
            href="/"
            className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-2xl text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-xl transform hover:-translate-y-2 hover:scale-105 inline-block relative overflow-hidden"
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
