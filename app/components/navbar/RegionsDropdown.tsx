"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Region {
  name: string;
  slug: string;
  emoji: string;
  description: string;
}

const regions: Region[] = [
  {
    name: "Northern Europe",
    slug: "northern-europe",
    emoji: "🏔️",
    description: "Nordic and Baltic countries",
  },
  {
    name: "Western Europe",
    slug: "western-europe",
    emoji: "🏰",
    description: "France, Germany, UK and neighbors",
  },
  {
    name: "Southern Europe",
    slug: "southern-europe",
    emoji: "🌅",
    description: "Mediterranean countries",
  },
  {
    name: "Eastern Europe",
    slug: "eastern-europe",
    emoji: "🏛️",
    description: "Slavic and former Soviet states",
  },
  {
    name: "Central America",
    slug: "central-america",
    emoji: "🌴",
    description: "Between North and South America",
  },
  {
    name: "Caribbean",
    slug: "caribbean",
    emoji: "🏝️",
    description: "Island nations of the Caribbean",
  },
  {
    name: "North America",
    slug: "north-america",
    emoji: "🗽",
    description: "USA, Canada, Mexico",
  },
  {
    name: "South America",
    slug: "south-america",
    emoji: "⛰️",
    description: "Amazon and Andes region",
  },
  {
    name: "Western Africa",
    slug: "western-africa",
    emoji: "🌍",
    description: "Atlantic coast of Africa",
  },
  {
    name: "Eastern Africa",
    slug: "eastern-africa",
    emoji: "🦒",
    description: "Horn of Africa and Great Lakes",
  },
  {
    name: "Northern Africa",
    slug: "northern-africa",
    emoji: "🐪",
    description: "Sahara and Mediterranean Africa",
  },
  {
    name: "Middle Africa",
    slug: "middle-africa",
    emoji: "🌳",
    description: "Central African rainforests",
  },
  {
    name: "Southern Africa",
    slug: "southern-africa",
    emoji: "💎",
    description: "South of Zambezi River",
  },
  {
    name: "Western Asia",
    slug: "western-asia",
    emoji: "🕌",
    description: "Middle East region",
  },
  {
    name: "Central Asia",
    slug: "central-asia",
    emoji: "🏔️",
    description: "Former Soviet Central Asian republics",
  },
  {
    name: "Eastern Asia",
    slug: "eastern-asia",
    emoji: "🏯",
    description: "China, Japan, Korea",
  },
  {
    name: "South-Eastern Asia",
    slug: "south-eastern-asia",
    emoji: "🌺",
    description: "ASEAN countries",
  },
  {
    name: "Southern Asia",
    slug: "southern-asia",
    emoji: "🕉️",
    description: "Indian subcontinent",
  },
  {
    name: "Australia and New Zealand",
    slug: "australia-and-new-zealand",
    emoji: "🦘",
    description: "Oceania mainland",
  },
  {
    name: "Melanesia",
    slug: "melanesia",
    emoji: "🏊",
    description: "Pacific island groups",
  },
  {
    name: "Micronesia",
    slug: "micronesia",
    emoji: "🐠",
    description: "Small Pacific islands",
  },
  {
    name: "Polynesia",
    slug: "polynesia",
    emoji: "🌺",
    description: "Hawaii and Pacific triangles",
  },
];

export default function RegionsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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

  const handleRegionClick = (region: Region) => {
    setIsOpen(false);
    setSearchTerm("");
    router.push(`/region/${region.slug}`);
  };

  // Filter regions based on search term
  const filteredRegions = regions.filter((region) =>
    region.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg ${
          isOpen
            ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg"
            : "bg-white/80 hover:bg-white text-gray-700 hover:text-purple-600 border border-gray-200 hover:border-purple-300"
        }`}
      >
        <span className="text-2xl">🗺️</span>
        <span className="hidden sm:block text-lg">Regions</span>
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
          <div className="p-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white">
            <h3 className="font-bold text-xl flex items-center gap-2">
              🗺️ Sub-Regions
            </h3>
            <p className="text-sm opacity-90 mt-1">
              Explore specific regions around the world
            </p>
          </div>

          {/* Search Bar */}
          <div className="p-4 border-b border-gray-100">
            <input
              type="text"
              placeholder="Search regions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div className="max-h-96 overflow-y-auto p-2">
            {filteredRegions.length > 0 ? (
              filteredRegions.map((region) => (
                <button
                  key={region.slug}
                  onClick={() => handleRegionClick(region)}
                  className="w-full p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 text-left group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                      {region.emoji}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                        {region.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {region.description}
                      </p>
                    </div>
                    <svg
                      className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors"
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
                <p className="text-gray-600">No regions found</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
