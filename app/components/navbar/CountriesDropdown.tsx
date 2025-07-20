"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import getContinentCountries from "@/lib/getContinentCountries";

export default function CountriesDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch all countries when dropdown opens
  useEffect(() => {
    const fetchAllCountries = async () => {
      if (!isOpen || countries.length > 0) return;

      setLoading(true);
      try {
        // Fetch from all regions
        const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
        const allCountriesPromises = regions.map((region) =>
          getContinentCountries(region)
        );
        const results = await Promise.all(allCountriesPromises);

        // Flatten and sort countries
        const allCountries = results
          .flat()
          .sort((a, b) => a.name.common.localeCompare(b.name.common));
        setCountries(allCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCountries();
  }, [isOpen, countries.length]);

  const handleCountryClick = (country: Country) => {
    setIsOpen(false);
    setSearchTerm("");
    router.push(`/country/${encodeURIComponent(country.name.common)}`);
  };

  // Filter countries based on search term
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg ${
          isOpen
            ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
            : "bg-white/80 hover:bg-white text-gray-700 hover:text-green-600 border border-gray-200 hover:border-green-300"
        }`}
      >
        <span className="text-2xl">🌎</span>
        <span className="hidden sm:block text-lg">Countries</span>
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-96 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/30 overflow-hidden z-50 animate-fade-in">
          <div className="p-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <h3 className="font-bold text-xl flex items-center gap-2">
              🌎 All Countries
            </h3>
            <p className="text-sm opacity-90 mt-1">
              Search and explore countries worldwide
            </p>
          </div>

          {/* Search Bar */}
          <div className="p-4 border-b border-gray-100">
            <input
              type="text"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="max-h-96 overflow-y-auto p-2">
            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mb-4"></div>
                <p className="text-gray-600">Loading countries...</p>
              </div>
            ) : (
              <>
                {filteredCountries.length > 0 ? (
                  filteredCountries.slice(0, 50).map((country) => (
                    <button
                      key={country.cca3}
                      onClick={() => handleCountryClick(country)}
                      className="w-full p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                          {country.flag}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors truncate">
                            {country.name.common}
                          </h4>
                          <p className="text-sm text-gray-500 truncate">
                            {country.capital?.[0] || "No capital"} •{" "}
                            {country.region}
                          </p>
                        </div>
                        <svg
                          className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors"
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
                    </button>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <span className="text-4xl mb-2 block">🔍</span>
                    <p className="text-gray-600">No countries found</p>
                  </div>
                )}

                {/* Show count if search results are limited */}
                {filteredCountries.length > 50 && (
                  <div className="text-center py-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500">
                      Showing first 50 of {filteredCountries.length} results
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
